import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-loading-skeleton/dist/skeleton.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Popeye. — Powered by AI',
  description: 'Elevate your documents.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='light'>
      <Providers>
        <body className={cn('min-h-screen font-sans antialiased grainy', inter.className)}>
          <Toaster />
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
