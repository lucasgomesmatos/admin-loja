import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/fecth';
import { FileContent } from '@/utils/types/file-content';
import { ArrowLeft, FileText, LinkIcon } from 'lucide-react';
import Link from 'next/link';

async function fetchFiles(id: string): Promise<FileContent[]> {
  const response = await api(`products/${id}/files`);
  const files = await response.json();

  return files;
}

interface FilePageProps {
  params: {
    id: string;
  };
  searchParams: {
    name: string;
  };
}

export default async function FilePage({
  params,
  searchParams,
}: FilePageProps) {
  const files = await fetchFiles(params.id);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex gap-6 ">
        <Link href="/dashboard/products">
          <Button variant="outline" className="flex gap-2 items-center">
            <ArrowLeft className="size-4" /> Voltar
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">
          {searchParams.name}:{' '}
          <span className="font-medium text-xl">Arquivos</span>
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {files.map((file) => (
          <Card key={file.id}>
            <CardHeader className="flex flex-1 flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold">
                {file.name}
              </CardTitle>
              <FileText className="size-5 text-muted-foreground" />
            </CardHeader>

            <CardFooter className="space-x-4 mt-4">
              <Link href={file.url} target="_blank">
                <Button variant="secondary">
                  <LinkIcon className="size-4 text-emerald-950" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
