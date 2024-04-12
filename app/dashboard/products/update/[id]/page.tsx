import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { fetchCategories } from "@/app/actions/categories/get-all-categories";
import { api } from "@/lib/fecth";
import { Category } from "@/utils/types/category";
import { FileContent } from "@/utils/types/file-content";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const FormUpdateProduct = dynamic(
  () => import("@/app/dashboard/products/components/form-update-product"),
  { ssr: false }
);

async function fetchFiles(id: string): Promise<{
  files: FileContent[];
  categories: Category[];
}> {
  const response = await api(`products/${id}/files`);
  const { files, categories } = await response.json();

  return {
    files,
    categories,
  };
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
  const { files, categories: categoriesProduct } = await fetchFiles(params.id);
  const { categories } = await fetchCategories();

  return (
    <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-6 ">
      <div className="flex gap-6 items-center">
        <Link href="/dashboard/products">
          <Button variant="outline" className="flex gap-2 items-center">
            <ArrowLeft className="size-4" /> Voltar
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">
          Editar Produto: {searchParams.name}
        </h1>
      </div>

      <Suspense>
        <FormUpdateProduct
          productId={params.id}
          files={files}
          categories={categories}
          categoriesChecked={categoriesProduct}
        />
      </Suspense>
    </main>
  );
}
