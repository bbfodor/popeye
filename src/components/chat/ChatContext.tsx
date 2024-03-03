import { trpc } from '@/app/_trpc/client';
import { INFINITE_QUERY_LIMIT } from '@/conf/infinite-query';
import { useMutation } from '@tanstack/react-query';
import React, { ReactNode, createContext, useRef, useState } from 'react';
import { useToast } from '../ui/use-toast';

type StreamResponse = {
  addMessage: () => void;
  message: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
};
export const ChatContext = createContext<StreamResponse>({
  addMessage: () => {},
  message: '',
  handleInputChange: () => {},
  isLoading: false,
});

export const ChatContextProvider = (props: { fileId: string; children: ReactNode }) => {
  const { fileId, children } = props;

  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const trpcUtils = trpc.useUtils();
  const { toast } = useToast();

  const backupMessage = useRef('');

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (mutationProps: { msg: string }) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify({
          fileId,
          message: mutationProps.msg,
        }),
      });
      if (!response.ok) throw new Error('Failed to send message');

      return response.body;
    },
    onMutate: async ({ msg }) => {
      backupMessage.current = msg;
      setMessage('');

      await trpcUtils.getFileMessages.cancel();
      const previousMessages = trpcUtils.getFileMessages.getInfiniteData();
      trpcUtils.getFileMessages.setInfiniteData({ fileId, limit: INFINITE_QUERY_LIMIT }, (previousData) => {
        if (!previousData) {
          return {
            pages: [],
            pageParams: [],
          };
        }

        let newPages = [...previousData.pages];
        let latestPage = newPages[0]!;
        latestPage.messages = [
          {
            createdAt: new Date().toISOString(),
            id: crypto.randomUUID(),
            text: message,
            isUserMessage: true,
          },
          ...latestPage.messages,
        ];
        newPages[0] = latestPage;

        return {
          ...previousData,
          pages: newPages,
        };
      });

      setIsLoading(true);

      return {
        previousMessages: previousMessages?.pages.flatMap((page) => page.messages) ?? [],
      };
    },

    onSuccess: async (stream) => {
      setIsLoading(false);

      if (!stream) {
        return toast({
          title: 'There was a problem sending this message',
          description: 'Please refresh this page and try again',
          variant: 'destructive',
        });
      }

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      let accResponse = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        accResponse += chunkValue;

        trpcUtils.getFileMessages.setInfiniteData({ fileId, limit: INFINITE_QUERY_LIMIT }, (previousData) => {
          if (!previousData) return { pages: [], pageParams: [] };

          // TODO -- let's optimize this by caching this value
          let isAiResponseCreated = previousData.pages.some((page) =>
            page.messages.some((pageMessage) => pageMessage.id === 'ai-response')
          );

          let updatedPages = previousData.pages.map((page) => {
            if (page !== previousData.pages[0]) return page;

            let updatedMessages;

            if (!isAiResponseCreated) {
              updatedMessages = [
                {
                  createdAt: new Date().toISOString(),
                  id: 'ai-response',
                  text: accResponse,
                  isUserMessage: false,
                },
                ...page.messages,
              ];
            } else {
              updatedMessages = page.messages.map((message) => {
                if (message.id === 'ai-response') {
                  return {
                    ...message,
                    text: accResponse,
                  };
                }
                return message;
              });
            }

            return {
              ...page,
              messages: updatedMessages,
            };
          });

          return { ...previousData, pages: updatedPages };
        });
      }
    },

    onError: (_, __, context) => {
      setMessage(backupMessage.current);
      trpcUtils.getFileMessages.setData({ fileId }, { messages: context?.previousMessages ?? [] });
    },
    onSettled: async () => {
      setIsLoading(false);

      await trpcUtils.getFileMessages.invalidate({ fileId });
    },
  });

  const addMessage = () => sendMessage({ msg: message });
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(event.target.value);

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
