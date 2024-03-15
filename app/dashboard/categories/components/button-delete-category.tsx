"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useCategoryStore } from "../store/store-category";

interface ButtonDeleteCategoryProps {
  categoryId: string;
  name: string;
}

export const ButtonDeleteCategory = ({
  categoryId,
  name,
}: ButtonDeleteCategoryProps) => {
  const { openDialogDeleteCategoryAction } = useCategoryStore();

  return (
    <Button
      title="Excluir Categoria"
      variant="destructive"
      onClick={() => openDialogDeleteCategoryAction(name, categoryId)}
    >
      <Trash className="size-4" />
    </Button>
  );
};
