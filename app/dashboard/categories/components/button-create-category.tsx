"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCategoryStore } from "../store/store-category";

export const ButtonCreateCategory = () => {
  const { openDialogCreateCategoryAction } = useCategoryStore();

  return (
    <Button
      onClick={() => openDialogCreateCategoryAction(true)}
      className="flex gap-2 items-center"
    >
      <Plus className="size-4" /> CRIAR NOVA CATEGORIA
    </Button>
  );
};
