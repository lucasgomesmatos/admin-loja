"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCategoryStore } from "../store/store-category";

export default function DialogDeleteProduct() {
  const { dialogDeleteCategoryOpen, openDialogDeleteCategoryAction } =
    useCategoryStore();

  // const [state, action] = useFormState(
  //   () => fetchDeleteProduct(dialogDeleteCategoryOpen.productId),
  //   initialStateCreateProduct,
  // );

  // useEffect(() => {
  //   if (state.error.length) {
  //     toast.error(state.error);
  //   }

  //   if (state.ok && dialogDeleteProductOpen.productId) {
  //     toast.success(`Produto excluído com sucesso.`);
  //     openDialogDeleteProductAction(null);
  //   }
  // }, [state, openDialogDeleteProductAction, dialogDeleteProductOpen.productId]);

  if (!dialogDeleteCategoryOpen.open) return null;

  return (
    <>
      <Dialog
        open={dialogDeleteCategoryOpen.open}
        onOpenChange={() => openDialogDeleteCategoryAction(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Excluir Produto</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja deletar o produto?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* <form action={action}>
              <ButtonLoading type="submit">Excluir</ButtonLoading>
            </form> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
