import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    template: '%s | Lojinha de Atividades',
    default: 'Lojinha de Atividades',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.variable} lang="pt-BR">
      <body className=" antialiased">
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
