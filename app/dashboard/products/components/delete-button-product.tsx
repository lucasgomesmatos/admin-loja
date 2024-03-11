'use client';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useProductStore } from '../store/store';

interface DeleteButtonProductProps {
  productId: string;
}

export const DeleteButtonProduct = ({
  productId,
}: DeleteButtonProductProps) => {
  const { openDialogDeleteProductAction } = useProductStore();

  return (
    <Button
      variant="destructive"
      title="Apagar Produto"
      onClick={() => openDialogDeleteProductAction(productId)}
    >
      <Trash className="size-4" />
    </Button>
  );
};
