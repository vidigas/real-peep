import './globals.css';
import type { Metadata } from 'next';
import SideNav from '../components/SideNav';
import TopBar from '../components/TopBar';

export const metadata: Metadata = {
  title: 'RealPeep — Transactions',
  description: 'POC: Add Transaction modal with Supabase',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <div className="flex min-h-screen">
          <SideNav />
          <div className="flex-1">
            <TopBar />
            <main className="mx-auto max-w-[var(--container-w)] px-6 py-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
