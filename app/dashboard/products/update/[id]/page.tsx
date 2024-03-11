import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { api } from '@/lib/fecth';
import { FileContent } from '@/utils/types/file-content';
import dynamic from 'next/dynamic';
const FormUpdateProduct = dynamic(
  () => import('@/app/dashboard/products/components/form-update-product'),
  { ssr: false },
);

async function fetchFiles(id: string): Promise<FileContent[]> {
  const response = await api(`products/${id}/files`);
  const files = await response.json();

  return files;
}

interface UpdatePageProps {
  params: {
    id: string;
  };
  searchParams: {
    name: string;
  };
}

export default async function UpdatePage({
  params,
  searchParams,
}: UpdatePageProps) {
  const files = await fetchFiles(params.id);

  return (
    <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-6 ">
      <div className="flex gap-6 ">
        <Link href="/dashboard/products">
          <Button variant="outline" className="flex gap-2 items-center">
            <ArrowLeft className="size-4" /> Voltar
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">
          Editar Produto: {searchParams.name}
        </h1>
      </div>

      <FormUpdateProduct files={files} />
    </main>
  );
}
