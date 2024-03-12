import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EditIcon, Layers } from "lucide-react";

import { fetchCategories } from "@/app/actions/categories/get-all-categories";
import { ButtonCreateCategory } from "./components/button-create-category";
import DialogCreateCategory from "./components/dialog-create-category";
import { SearchCategories } from "./components/search-categories";

export const metadata: Metadata = {
  title: "Categorias",
};

export default async function CategoriesPage() {
  const categories = await fetchCategories();

  return (
    <>
      <SearchCategories />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Categorias</h1>

          <ButtonCreateCategory />
        </div>
        <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-ellipsis font-semibold">
                  {category.name}
                </CardTitle>
                <Layers className="size-5 text-muted-foreground" />
              </CardHeader>

              <CardFooter className="space-x-4">
                <Button
                  title="Editar Categoria"
                  variant="outline"
                  className="bg-emerald-400 hover:bg-emerald-500"
                >
                  <EditIcon className="size-4 text-emerald-950" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <DialogCreateCategory />
      </main>
    </>
  );
}
