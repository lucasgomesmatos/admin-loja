'use client';

import { fetchDeleteProduct } from '@/app/actions/product/delete-product';
import { ButtonLoading } from '@/components/button-loading';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { useProductContext } from '../context/product-context';
import { initialStateCreateProduct } from '../utils/products-utils';

export default function DialogDeleteProduct() {
  const {
    openDialogDeleteProduct,
    product: { dialogDeleteProductOpen },
  } = useProductContext();

  const [state, action] = useFormState(
    () => fetchDeleteProduct(dialogDeleteProductOpen.productId),
    initialStateCreateProduct,
  );

  useEffect(() => {
    if (state.error.length) {
      toast.error(state.error);
    }

    if (state.ok && dialogDeleteProductOpen.productId) {
      toast.success(`Produto excluído com sucesso.`);
      openDialogDeleteProduct(null);
    }
  }, [state, openDialogDeleteProduct, dialogDeleteProductOpen.productId]);

  if (!dialogDeleteProductOpen.open) return null;

  return (
    <>
      <Dialog
        open={dialogDeleteProductOpen.open}
        onOpenChange={() => openDialogDeleteProduct(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Excluir Produto</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja deletar o produto?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <form action={action}>
              <ButtonLoading type="submit">Excluir</ButtonLoading>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
