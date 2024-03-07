import { fetchProducts } from '@/app/actions/product/get-all-products';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EditIcon, Files, LibraryBig, Plus, Trash } from 'lucide-react';
import Link from 'next/link';

export default async function ProductPage() {
  const products = await fetchProducts();

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Produtos</h1>
          <Link href="/dashboard/products/register">
            <Button className="flex gap-2 items-center">
              <Plus className="size-4" /> CRIAR NO PRODUTO
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">
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
                <Button
                  variant="outline"
                  className="bg-emerald-400 hover:bg-emerald-500"
                >
                  <EditIcon className="size-4 text-emerald-950" />
                </Button>
                <Button variant="destructive">
                  <Trash className="size-4" />
                </Button>
                <Link href={`/dashboard/products/${product.id}`}>
                  <Button>
                    <Files className="size-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
