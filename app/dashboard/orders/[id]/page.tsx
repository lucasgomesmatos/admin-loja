import { fetchProfile } from "@/app/actions/auth/me";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/fecth";
import { FileContent } from "@/utils/types/file-content";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import { ButtonDownload } from "../components/button-download";

async function fetchFiles(id: string): Promise<FileContent[]> {
  const response = await api(`products/${id}/files`);
  const data = await response.json();

  return data.files;
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

  const { name, cpf } = await fetchProfile();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex gap-6 items-center">
        <Link href="/dashboard/orders">
          <Button variant="outline" className="flex gap-2 items-center">
            <ArrowLeft className="size-4" /> Voltar
          </Button>
        </Link>
        <h1 className="text-xl font-bold tracking-tight">
          {searchParams.name} -
          <span className="font-medium text-xl">
            {files.length > 1 ? ` Arquivos` : ` Arquivo`}
          </span>
        </h1>
      </div>
      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2">
        {files.map((file) => (
          <Card key={file.id}>
            <CardHeader className="flex flex-1 flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-semibold text-wrap text-clip w-[90%]">
                {file.name}
              </CardTitle>
              <FileText className="size-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col gap-2 mt-5">
              <ButtonDownload file={file} name={name} cpf={cpf} />
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
