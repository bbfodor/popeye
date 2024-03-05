'use client';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  if (isLoading) return <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />;
  if (!isAuthenticated) router.push('/sign-in');

  const origin = searchParams.get('origin');

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => success && router.push(origin ? `/${origin}` : '/dashboard'),
    // TODO -- use `origin` after sign in
    onError: (err) => err.data?.code === 'UNAUTHORIZED' && router.push('/sign-in'),
    retry: true,
    retryDelay: 500,
  });

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />

        <h3 className='font-semibold text-xl'>Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
