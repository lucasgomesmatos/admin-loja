"use client";

import { ButtonLoading } from "@/components/button-loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

import { resetPasswordAction } from "@/app/actions/auth/reset-password";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useResetPassword } from "../reset-password/store/store-reset-password";
import { handleDisabledResetPassword } from "../reset-password/utils/reset-password";

const initialState = {
  data: null,
  ok: false,
  error: "",
};

export const FormResetPassword = () => {
  const [state, action] = useFormState(resetPasswordAction, initialState);
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const token = useSearchParams().get("token");

  const { replace } = useRouter();

  const {
    addConfirmationPasswordValueAction,
    addPasswordValueAction,
    confirmationPasswordValue,
    passwordValue,
    reset,
  } = useResetPassword();

  useEffect(() => {
    if (state.error.length) {
      toast.error(state.error);
    }

    if (state.ok) {
      reset();
      replace("/auth/sign-in-member");
    }
  }, [state, replace, reset]);

  const disabled = handleDisabledResetPassword({
    password: passwordValue!,
    confirmationPassword: confirmationPasswordValue!,
  });

  const onSubmit = (formData: FormData) => {
    formData.append("token", token!);
    action(formData);
  };

  return (
    <div>
      <form action={onSubmit} className="space-y-4 ">
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>

          <div className="relative">
            <Input
              className="appearance-none pr-8 "
              name="password"
              value={passwordValue || ""}
              onChange={({ target }) => addPasswordValueAction(target.value)}
              type={passwordVisibility ? "password" : "text"}
            />
            {passwordVisibility ? (
              <Eye
                className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-500  cursor-pointer"
                onClick={() => setPasswordVisibility(false)}
              />
            ) : (
              <EyeOff
                className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-500  cursor-pointer"
                onClick={() => setPasswordVisibility(true)}
              />
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmation-password">Confirma Senha</Label>

          <div className="relative">
            <Input
              name="confirmation-password"
              className=" appearance-none pr-8"
              value={confirmationPasswordValue || ""}
              onChange={({ target }) =>
                addConfirmationPasswordValueAction(target.value)
              }
              type={passwordVisibility ? "password" : "text"}
            />
          </div>
        </div>

        <ButtonLoading disabled={disabled}>Recuperar</ButtonLoading>
      </form>
    </div>
  );
};
