import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';

const Navbar = () => {
  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link href='/' className='flex x-40'>
            <span className='font-semibold text-primary'>Popeye</span>
            <span className='font-extrabold'>.</span>
          </Link>

          <div className='hidden items-center space-x-4 sm:flex'>
            <>
              <Link
                href='/pricing'
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                })}
              >
                Pricing
              </Link>
              <LoginLink
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                })}
              >
                Sign in
              </LoginLink>
              <RegisterLink
                className={buttonVariants({
                  size: 'sm',
                })}
              >
                Get started
              </RegisterLink>
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
