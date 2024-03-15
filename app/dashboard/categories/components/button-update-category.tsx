"use client";

import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { useCategoryStore } from "../store/store-category";

interface ButtonUpdateCategoryProps {
  categoryId: string;
  name: string;
}

export const ButtonUpdateCategory = ({
  categoryId,
  name,
}: ButtonUpdateCategoryProps) => {
  const { openDialogUpdateCategoryAction } = useCategoryStore();

  return (
    <Button
      title="Editar Categoria"
      variant="outline"
      className="bg-emerald-400 hover:bg-emerald-500"
      onClick={() => openDialogUpdateCategoryAction(name, categoryId)}
    >
      <EditIcon className="size-4 text-emerald-950" />
    </Button>
  );
};
