import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const MaxWidthWrapper = (props: { className?: string; children: ReactNode }) => (
  <div className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20', props.className)}>{props.children}</div>
);

export default MaxWidthWrapper;
