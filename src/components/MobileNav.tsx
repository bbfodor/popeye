'use client';

import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import { ArrowRight, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const MobileNav = ({ isAuth }: { isAuth: boolean }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const closeOnCurrent = (href: string) => pathname === href && setOpen(false);

  return (
    <div className='sm:hidden'>
      <Menu onClick={toggleOpen} className='relative z-50 h-5 w-5 text-zinc-700' />

      {isOpen ? (
        <div className='fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full'>
          <ul className='absolute bg-white border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8'>
            {!isAuth ? (
              <>
                <li>
                  <RegisterLink className='flex items-center w-full font-semibold text-primary'>
                    Get started
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </RegisterLink>
                </li>
                <li className='my-3 h-px w-full bg-gray-300' />
                <li>
                  <LoginLink className='flex items-center w-full font-semibold'>Sign in</LoginLink>
                </li>
                <li className='my-3 h-px w-full bg-gray-300' />
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/pricing')}
                    className='flex items-center w-full font-semibold'
                    href='/pricing'
                  >
                    Pricing
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/dashboard')}
                    className='flex items-center w-full font-semibold'
                    href='/dashboard'
                  >
                    Dashboard
                  </Link>
                </li>
                <li className='my-3 h-px w-full bg-gray-300' />
                <li>
                  <LogoutLink className='flex items-center w-full font-semibold'>Sign out</LogoutLink>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
