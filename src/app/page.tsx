import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import TypingAnimation from '@/components/TypingAnimation';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'>
        <div className='mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50'>
          <p className='text-sm font-semibold text-gray-700'>Popeye is now public!</p>
        </div>

        <div className='max-w-4xl font-bold -tracking-[0.1px] text-5xl leading-tight md:text-6xl md:leading-tight lg:text-7xl lg:leading-tight'>
          <h1>
            Elevate your <span className='text-primary'>documents</span>.
          </h1>

          <h1 className='leading-snug'>
            {/* TODO -- if scroll back up then repeat animation (@mantine/hooks) */}
            <TypingAnimation
              sequence={['Prompt', 850, 'Ask', 750, 'Learn', 850, 'Chat']}
              preRenderFirstString={true}
              cursor={false}
              speed={15}
              deletionSpeed={30}
              className='bg-gradient-to-tr from-yellow-500 to-[#ff80b5] text-transparent bg-clip-text'
            />{' '}
            instantly.
          </h1>
        </div>

        <p className='mt-7 max-w-prose text-zinc-700 sm:text-lg '>
          Popeye allows you to have conversations about any PDF document. Simply upload your file and start prompting
          right away.
        </p>

        {/* TODO -- make this dynamic based on user state */}
        <Link className={buttonVariants({ size: 'lg', className: 'mt-7' })} href='/dashboard' target='_blank'>
          Get started <ArrowRight className='ml-2 h-5 w-5' />
        </Link>

        <p className='mt-3 max-w-prose text-zinc-700 sm:text-sm italic'>With the power of AI.</p>
      </MaxWidthWrapper>

      <div>
        <div className='relative isolate'>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              // N
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-yellow-500 to-[#ff80b5] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>

          <div>
            {/* cla */}
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-16 flow-root sm:mt-24'>
                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  {/* TODO -- retake this image on Mac, or https://answers.microsoft.com/en-us/windows/forum/all/high-quality-screenshots/2e3e3fd9-b377-48e8-9a0f-5597684188e3 */}
                  <Image
                    src='/dashboard-preview.jpg'
                    alt='product preview'
                    width={1330}
                    height={835}
                    quality={100}
                    className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10 '
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-yellow-500 to-[#ff80b5] opacity-20 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
            />
          </div>
        </div>
      </div>

      <div className='mx-auto mb-32 mt-32 max-w-5xl sm:mt-56'>
        <div className='mb-12 px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='mt-2 font-bold -tracking-[0.1px] text-4xl text-gray-900 sm:text-5xl'>
              Unlock <span className='text-primary'>insights</span> in minutes.
            </h2>

            <p className='mt-4 text-lg text-gray-600'>
              Querying your PDF files has never been easier than with Popeye.
            </p>
          </div>
        </div>

        <ol className='my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-primary'>Step 1</span>
              <span className='text-xl -tracking-[0.1px] font-semibold'>Sign up for an account</span>
              <span className='mt-2 text-zinc-700'>
                Either start out with a free plan or choose our{' '}
                <Link href='/pricing' className='text-primary underline underline-offset-2'>
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>

          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-primary'>Step 2</span>
              <span className='text-xl -tracking-[0.1px] font-semibold'>Upload your PDF file</span>
              <span className='mt-2 text-zinc-700'>
                We&apos;ll process your file and make it ready for you to chat with.
              </span>
            </div>
          </li>

          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-primary'>Step 3</span>
              <span className='text-xl -tracking-[0.1px] font-semibold'>Start asking questions</span>
              <span className='mt-2 text-zinc-700'>
                It&apos;s that simple. Try out Popeye today - it really takes less then a minute.
              </span>
            </div>
          </li>
        </ol>

        <div className='mx-auto max-w-6xl px-6 lg:px-8'>
          <div className='mt-16 flow-root sm:mt-24'>
            <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
              {/* TODO -- add only blur behind file upload modal, then retake this image */}
              <Image
                src='/file-upload-preview.jpg'
                alt='uploading preview'
                width={1419}
                height={732}
                quality={100}
                className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10 '
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
