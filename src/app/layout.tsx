import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import { cn, constructMetadata } from '@/lib/utils';
import { Inter } from 'next/font/google';
import 'react-loading-skeleton/dist/skeleton.css';
import 'simplebar-react/dist/simplebar.min.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = constructMetadata();

// TODO -- implement dark mode, etc. https://github.com/mcpdigital/quill/tree/darktheme

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
