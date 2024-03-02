import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError, initTRPC } from '@trpc/server';

const trpc = initTRPC.create();
const middleware = trpc.middleware;

const authorizer = middleware(async (opts) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!(user && user.id)) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return opts.next({
    ctx: {
      userId: user.id,
      user,
    },
  });
});

export const router = trpc.router;
export const publicProcedure = trpc.procedure;
export const privateProcedure = trpc.procedure.use(authorizer);
