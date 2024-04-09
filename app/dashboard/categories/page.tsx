import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react";

import { fetchCategories } from "@/app/actions/categories/get-all-categories";
import { NoResults } from "@/components/no-results";
import { Pagination } from "@/components/pagination";
import { CONSTANTS } from "@/utils/functions/constants";
import { Metadata } from "next";
import { Suspense } from "react";
import { ButtonCreateCategory } from "./components/button-create-category";
import { ButtonDeleteCategory } from "./components/button-delete-category";
import { ButtonUpdateCategory } from "./components/button-update-category";
import DialogCreateCategory from "./components/dialog-create-category";
import DialogDeleteCategory from "./components/dialog-delete-category";
import DialogUpdateCategory from "./components/dialog-update-category";
import { SearchCategories } from "./components/search-categories";

export const metadata: Metadata = {
  title: "Categorias",
};

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 1);
  const query = String(searchParams.search ?? "");

  const { categories, total } = await fetchCategories(page, query, true);

  return (
    <>
      <Suspense>
        <SearchCategories />
      </Suspense>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Categorias</h1>

          <ButtonCreateCategory />
        </div>
        <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2">
          {categories?.map((category) => (
            <Card key={category.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-ellipsis font-semibold">
                  {category.name}
                </CardTitle>
                <Layers className="size-5 text-muted-foreground" />
              </CardHeader>

              <CardFooter className="space-x-4">
                <ButtonUpdateCategory
                  categoryId={category.id}
                  name={category.name}
                />
                <ButtonDeleteCategory
                  categoryId={category.id}
                  name={category.name}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
        {!categories?.length && <NoResults />}
        {Boolean(categories?.length) && total > CONSTANTS.POR_PAGES_MAX_16 && (
          <Pagination
            pageIndex={page - 1}
            perPage={CONSTANTS.POR_PAGES_MAX_16}
            totalCount={total}
            result={categories}
          />
        )}
        <DialogCreateCategory />
        <DialogUpdateCategory />
        <DialogDeleteCategory />
      </main>
    </>
  );
}
