'use client';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useProductContext } from '../context/product-context';

interface DeleteButtonProductProps {
  productId: string;
}

export const DeleteButtonProduct = ({
  productId,
}: DeleteButtonProductProps) => {
  const { openDialogDeleteProduct } = useProductContext();

  return (
    <Button
      variant="destructive"
      title="Apagar Produto"
      onClick={() => openDialogDeleteProduct(productId)}
    >
      <Trash className="size-4" />
    </Button>
  );
};
