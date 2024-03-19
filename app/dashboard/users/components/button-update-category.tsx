"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/utils/types/user";
import { EditIcon } from "lucide-react";
import { useUserStore } from "../store/store-user";

interface ButtonUpdateUserProps {
  userId: string;
  user: User;
}

export const ButtonUpdateUser = ({ userId, user }: ButtonUpdateUserProps) => {
  const { openDialogUpdateUserAction } = useUserStore();

  return (
    <Button
      title="Editar usuário"
      variant="outline"
      className="bg-emerald-400 hover:bg-emerald-500"
      onClick={() => openDialogUpdateUserAction(user, userId)}
    >
      <EditIcon className="size-4 text-emerald-950" />
    </Button>
  );
};
