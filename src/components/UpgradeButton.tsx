'use client';

import { trpc } from '@/app/_trpc/client';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const UpgradeButton = () => {
  const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
    onSuccess: ({ url }) => {
      window.location.href = url ?? '/dashboard/billing';
    },
  });

  return (
    <Button className='w-full' onClick={() => createStripeSession()}>
      Upgrade now <ArrowRight className='h-5 w-5 ml-1.5' />
    </Button>
  );
};

export default UpgradeButton;
