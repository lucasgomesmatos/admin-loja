import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditIcon, Files, LibraryBig, Plus } from "lucide-react";
import Link from "next/link";
import { DeleteButtonProduct } from "./components/delete-button-product";

import { fetchCategories } from "@/app/actions/categories/get-all-categories";
import { fetchProducts } from "@/app/actions/products/get-all-products";
import { NoResults } from "@/components/no-results";
import { Pagination } from "@/components/pagination";
import { CONSTANTS } from "@/utils/functions/constants";
import dynamic from "next/dynamic";
import { SearchProducts } from "./components/search-products";

const DialogDeleteProduct = dynamic(
  () => import("./components/dialog-delete-product"),
  { ssr: false }
);

export default async function ProductPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 1);
  const query = String(searchParams.search ?? "");
  const categoriesFilter = String(searchParams.categories ?? "");

  const { categories } = await fetchCategories();
  const { products, total } = await fetchProducts(
    page,
    query,
    categoriesFilter
  );

  return (
    <>
      <SearchProducts categories={categories} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Produtos</h1>
          <Link href="/dashboard/products/register">
            <Button className="flex gap-2 items-center">
              <Plus className="size-4" /> CRIAR NOVO PRODUTO
            </Button>
          </Link>
        </div>
        <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-ellipsis font-semibold">
                  {product.name}
                </CardTitle>
                <LibraryBig className="size-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-1">
                <span className="text-sm text-muted-foreground">
                  woocommerce: {product.idWoocommerce}
                </span>
              </CardContent>
              <CardFooter className="space-x-4">
                <Link
                  href={`/dashboard/products/update/${product.id}?name=${product.name}&idWoocommerce=${product.idWoocommerce}`}
                >
                  <Button
                    title="Editar Produto"
                    variant="outline"
                    className="bg-emerald-400 hover:bg-emerald-500"
                  >
                    <EditIcon className="size-4 text-emerald-950" />
                  </Button>
                </Link>
                <DeleteButtonProduct productId={product.id} />
                <Link
                  href={`/dashboard/products/${product.id}?name=${product.name}`}
                >
                  <Button title="Arquivos">
                    <Files className="size-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        {!products.length && <NoResults />}
        {total > CONSTANTS.POR_PAGES && (
          <Pagination
            pageIndex={page - 1}
            perPage={CONSTANTS.POR_PAGES}
            totalCount={total}
            result={categories}
          />
        )}
        <DialogDeleteProduct />
      </main>
    </>
  );
}
