import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import dynamic from 'next/dynamic';
const FormRegisterProduct = dynamic(
  () => import('@/app/dashboard/products/components/form-register-product'),
  { ssr: false },
);
export default function page() {
  return (
    <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-6 ">
      <div className="flex gap-6 ">
        <Link href="/dashboard/products">
          <Button variant="outline" className="flex gap-2 items-center">
            <ArrowLeft className="size-4" /> Voltar
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">
          Criar novo Produto
        </h1>
      </div>

      <FormRegisterProduct />
    </main>
  );
}
