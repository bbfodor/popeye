import { db } from '@/db';
import { pinecone } from '@/lib/pinecone';
import { getUserSubscriptionPlan } from '@/lib/stripe';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { FileRouter, createUploadthing } from 'uploadthing/next';

const f = createUploadthing();

const middleware = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!(user && user.id)) throw new Error('Unauthorized');

  const subscriptionPlan = await getUserSubscriptionPlan();

  return { subscriptionPlan, userId: user.id };
};

const onUploadComplete = async (props: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: {
    key: string;
    name: string;
    url: string;
  };
}) => {
  const { file, metadata } = props;
  const { subscriptionPlan } = metadata;
  const { isSubscribed } = subscriptionPlan;

  const isFileExist = await db.file.findFirst({
    where: {
      key: file.key,
    },
  });
  if (isFileExist) return;

  const createdFile = await db.file.create({
    data: {
      key: file.key,
      name: file.name,
      userId: metadata.userId,
      url: file.url ?? `https://utfs.io/f/${file.key}`,
      uploadStatus: 'PROCESSING',
    },
  });

  try {
    const response = await fetch(createdFile.url);
    const pdfLoader = new PDFLoader(await response.blob());
    const pageLevelDocs = await pdfLoader.load();
    // TODO -- if pageLevelDocs length == 0 then show an error

    await PineconeStore.fromDocuments(
      pageLevelDocs,
      new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
      }),
      {
        pineconeIndex: pinecone.index('popeye'),
        namespace: createdFile.id,
      }
    );

    await db.file.update({
      data: {
        uploadStatus: 'SUCCESS',
      },
      where: {
        id: createdFile.id,
      },
    });
  } catch (err) {
    console.log(err);
    await db.file.update({
      data: {
        uploadStatus: 'FAILED',
      },
      where: {
        id: createdFile.id,
      },
    });
  }
};

export const ourFileRouter = {
  freePlanUploader: f({ pdf: { maxFileSize: '4MB' } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  proPlanUploader: f({ pdf: { maxFileSize: '16MB' } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
