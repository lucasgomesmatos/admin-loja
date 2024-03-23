import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, LibraryBig } from "lucide-react";

import { fetchProductsByUsers } from "@/app/actions/products/get-all-products-by-users";
import { NoResults } from "@/components/no-results";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { CONSTANTS } from "@/utils/functions/constants";
import Link from "next/link";
import { Suspense } from "react";
import { SearchProductsOrders } from "./components/search-products";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 1);
  const query = String(searchParams.search ?? "");

  const { products, total } = await fetchProductsByUsers(page, query);

  return (
    <>
      <Suspense>
        <SearchProductsOrders />
      </Suspense>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Pedidos</h1>
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

              <CardContent className="flex flex-col gap-2 mt-5">
                <Link
                  href={`/dashboard/orders/${product.id}?name=${product.name}`}
                >
                  <Button title="Arquivos" className="w-full flex gap-2">
                    Arquivos
                    <FileText className="size-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        {!products.length && <NoResults />}
        {total > CONSTANTS.POR_PAGES && (
          <Pagination
            pageIndex={page - 1}
            perPage={CONSTANTS.POR_PAGES}
            totalCount={total}
            result={products}
          />
        )}
      </main>
    </>
  );
}
