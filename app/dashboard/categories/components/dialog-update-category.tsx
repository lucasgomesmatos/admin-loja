"use client";

import { fetchUpdateCategory } from "@/app/actions/categories/update-category";
import { ButtonLoading } from "@/components/button-loading";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Type } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useCategoryStore } from "../store/store-category";
import {
  formCategoryFieldsFilledOutCorrectly,
  initialStateCreateCategory,
} from "../utils/categories-utils";

export default function DialogUpdateCategory() {
  const {
    dialogUpdateCategoryOpen,
    openDialogUpdateCategoryAction,
    addCategoryNameValueAction,
    categoryNameValue,
  } = useCategoryStore();

  const [state, action] = useFormState(
    () =>
      fetchUpdateCategory(
        categoryNameValue!,
        dialogUpdateCategoryOpen.categoryId!
      ),
    initialStateCreateCategory
  );

  useEffect(() => {
    if (state.error.length) {
      toast.error(state.error);
    }

    if (state.ok) {
      toast.success(`Categoria atualizada com sucesso.`);
      openDialogUpdateCategoryAction(null, null);
      state.ok = false;
    }
  }, [state, openDialogUpdateCategoryAction]);

  const disabled = formCategoryFieldsFilledOutCorrectly({
    name: categoryNameValue!,
  });

  return (
    <>
      <Dialog
        open={dialogUpdateCategoryOpen.open}
        onOpenChange={() => openDialogUpdateCategoryAction(null, null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Atualizar Categoria</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <form className="flex w-full flex-col gap-4" action={action}>
              <div className=" space-y-1">
                <Label>Nome da categoria</Label>
                <div className="relative">
                  <Type className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    className="w-full bg-white shadow-none appearance-none pl-8  placeholder:text-sm"
                    placeholder="ex: 1º ano do ensino médio"
                    value={categoryNameValue || ""}
                    name="name"
                    onChange={({ target }) =>
                      addCategoryNameValueAction(target.value)
                    }
                  />
                </div>
              </div>

              <ButtonLoading disabled={disabled} type="submit">
                Atualizar
              </ButtonLoading>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
