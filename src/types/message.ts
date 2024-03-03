import { AppRouter } from '@/trpc';
import { inferRouterOutputs } from '@trpc/server';

type RouterOutput = inferRouterOutputs<AppRouter>;

export type Message = RouterOutput['getFileMessages']['messages'][number];
export type MessageJsx = Omit<Message, 'text'> & { text: JSX.Element };
