import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Event Concierge',
  description: 'Plan your next corporate offsite with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-[#020617] text-slate-50 antialiased selection:bg-blue-500/30`}>
        {children}
      </body>
    </html>
  );
}
