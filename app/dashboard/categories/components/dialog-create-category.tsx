"use client";

import { fetchCreateCategory } from "@/app/actions/categories/create-category";
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
import { initialStateCreateCategory } from "../utils/categories-utils";

export default function DialogCreateCategory() {
  const {
    dialogCreateCategoryOpen,
    openDialogCreateCategoryAction,
    addCategoryNameValueAction,
    categoryNameValue,
  } = useCategoryStore();

  const [state, action] = useFormState(
    () => fetchCreateCategory(categoryNameValue!),
    initialStateCreateCategory
  );

  useEffect(() => {
    if (state.error.length) {
      toast.error(state.error);
    }

    if (state.ok && dialogCreateCategoryOpen.open) {
      toast.success(`Categoria criada com sucesso.`);
      openDialogCreateCategoryAction();
    }
  }, [state, openDialogCreateCategoryAction, dialogCreateCategoryOpen]);

  if (!dialogCreateCategoryOpen.open) return null;

  return (
    <>
      <Dialog
        open={dialogCreateCategoryOpen.open}
        onOpenChange={() => openDialogCreateCategoryAction()}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar nova Categoria</DialogTitle>
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

              <ButtonLoading type="submit">Salvar</ButtonLoading>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
