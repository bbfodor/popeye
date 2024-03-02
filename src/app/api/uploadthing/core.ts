import { db } from '@/db';
import { pinecone } from '@/lib/pinecone';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const uploadThing = createUploadthing();

export const ourFileRouter = {
  pdfUploader: uploadThing({ pdf: { maxFileSize: '4MB' } })
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession();
      const user = await getUser();
      if (!(user && user.id)) throw new Error('Unauthorized');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
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
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
