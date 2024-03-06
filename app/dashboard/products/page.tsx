import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Plus } from 'lucide-react';
import Link from 'next/link';

export default function page() {
  return (
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
        <Card>
          <CardHeader
            title="Receitas total (mes)"
            className="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle className="text-base font-semibold">
              Receitas total (mes)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <span className="text-2xl font-bold tracking-tight">
              R$ 1.000,00
            </span>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 dark:text-emerald-400">
                +2%
              </span>{' '}
              em relação ao mes anterior
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
