"use client";

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
import { AtSign, Code, Heading, Phone } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import { fetchUpdateUser } from "@/app/actions/users/update-user";
import { useUserStore } from "../store/store-user";
import {
  formUsersFieldsFilledOutCorrectly,
  initialStateCreateUsers,
} from "../utils/users-utils";

export default function DialogUpdateUser() {
  const {
    dialogUpdateUserOpen,
    openDialogUpdateUserAction,
    addUserNameValueAction,
    userNameValue,
    addUserCpfValueAction,
    userCpfValue,
    addUserEmailValueAction,
    userEmailValue,
    userPhoneValue,
    addUserPhoneValueAction,
  } = useUserStore();

  const [state, action] = useFormState(
    () =>
      fetchUpdateUser({
        userId: dialogUpdateUserOpen.userId!,
        name: userNameValue!,
        email: userEmailValue!,
        cpf: userCpfValue!,
        phone: userPhoneValue!,
      }),
    initialStateCreateUsers
  );

  useEffect(() => {
    if (state.error.length) {
      toast.error(state.error);
    }

    if (state.ok) {
      toast.success(`Usuário criada com sucesso.`);
      openDialogUpdateUserAction(null, null);
      state.ok = false;
    }
  }, [state, openDialogUpdateUserAction]);

  const disabled = formUsersFieldsFilledOutCorrectly({
    name: userNameValue!,
    email: userEmailValue!,
    cpf: userCpfValue!,
    phone: userPhoneValue!,
  });

  return (
    <>
      <Dialog
        open={dialogUpdateUserOpen.open}
        onOpenChange={() => openDialogUpdateUserAction(null, null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar novo Usuário</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <form className="flex w-full flex-col " action={action}>
              <div>
                <Label className="text-xs">Nome:</Label>
                <div className="relative">
                  <Heading className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    className="w-full bg-white shadow-none appearance-none pl-8  placeholder:text-sm"
                    placeholder="ex: Fulano de Tal"
                    value={userNameValue || ""}
                    name="name"
                    onChange={({ target }) =>
                      addUserNameValueAction(target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs">Email:</Label>
                <div className="relative">
                  <AtSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    className="w-full bg-white shadow-none appearance-none pl-8  placeholder:text-sm"
                    placeholder="ex: fulano@email.com"
                    type="email"
                    value={userEmailValue || ""}
                    name="email"
                    onChange={({ target }) =>
                      addUserEmailValueAction(target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs">CPF:</Label>
                <div className="relative">
                  <Code className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    className="w-full bg-white shadow-none appearance-none pl-8  placeholder:text-sm"
                    placeholder="ex: 999.999.999-99"
                    value={userCpfValue || ""}
                    name="cpf"
                    onChange={({ target }) =>
                      addUserCpfValueAction(target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs">Telefone:</Label>
                <div className="relative">
                  <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    className="w-full bg-white shadow-none appearance-none pl-8  placeholder:text-sm"
                    placeholder="ex: 33 99999-9999"
                    value={userPhoneValue || ""}
                    name="phone"
                    onChange={({ target }) =>
                      addUserPhoneValueAction(target.value)
                    }
                  />
                </div>
              </div>

              <div className="mt-4">
                <ButtonLoading disabled={disabled} type="submit">
                  Salvar
                </ButtonLoading>
              </div>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
