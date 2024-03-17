"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useUserStore } from "../store/store-user";

export const ButtonCreateUsers = () => {
  const { openDialogCreateUserAction } = useUserStore();

  return (
    <Button
      onClick={() => openDialogCreateUserAction(true)}
      className="flex gap-2 items-center"
    >
      <Plus className="size-4" /> CRIAR NOVO USUÁRIO
    </Button>
  );
};
