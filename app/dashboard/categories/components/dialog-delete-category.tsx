"use client";

import { fetchDeleteCategory } from "@/app/actions/categories/delete-category";
import { ButtonLoading } from "@/components/button-loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useCategoryStore } from "../store/store-category";
import { initialStateCreateCategory } from "../utils/categories-utils";

export default function DialogDeleteCategory() {
  const { dialogDeleteCategoryOpen, openDialogDeleteCategoryAction } =
    useCategoryStore();

  const [state, action] = useFormState(
    () => fetchDeleteCategory(dialogDeleteCategoryOpen.categoryId!),
    initialStateCreateCategory
  );

  useEffect(() => {
    if (state.error.length) {
      toast.error(state.error);
    }

    if (state.ok) {
      toast.success(`Categoria excluída com sucesso.`);
      openDialogDeleteCategoryAction(null, null);
      state.ok = false;
    }
  }, [state, openDialogDeleteCategoryAction]);

  return (
    <>
      <Dialog
        open={dialogDeleteCategoryOpen.open}
        onOpenChange={() => openDialogDeleteCategoryAction(null, null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Excluir Categoria: {dialogDeleteCategoryOpen.nameCategory}
            </DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja excluir a categoria?
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
