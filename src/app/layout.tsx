import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import SupabaseListener from '@/components/SupabaseListener';

export const metadata: Metadata = {
  title: 'RealPeep',
  description: 'Transactions',
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full font-sans`}>
      <body className="h-full text-body-text antialiased">
        <SupabaseListener />
        {children} {/* child layouts/pages render here */}
      </body>
    </html>
  );
}
