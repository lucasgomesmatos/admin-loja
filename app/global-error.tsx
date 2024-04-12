"use client"

import { Button } from '@/components/ui/button';
import { RotateCcw, ShieldX } from 'lucide-react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });




export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html className={inter.variable} lang="pt-BR">
      <body className=" antialiased">
        <div className="flex w-full h-screen items-center justify-center flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="flex gap-4 text-2xl flex-col items-center font-bold">
              <ShieldX className="size-11" />  500 - Ocorreu um erro !
            </h1>
            <p className="text-center ">
              Se o erro persistir, entre em contato com o suporte.
            </p>
          </div>
          <p className="text-center max-w-96">
            <code>{error?.message}</code>
          </p>

          <Link href="/">
            <Button className="gap-4" variant="outline" onClick={() => reset()}>
              Tente novamente
              <RotateCcw className="size-4" />
            </Button>
          </Link>
        </div>
      </body>
    </html>
  );
}