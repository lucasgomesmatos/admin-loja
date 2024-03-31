"use client";

import { forgotPasswordAction } from "@/app/actions/auth/forgot-password";
import { ButtonLoading } from "@/components/button-loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

const initialState = {
  data: null,
  ok: false,
  error: "",
};

export const FormForgotPassword = () => {
  const [state, action] = useFormState(forgotPasswordAction, initialState);
  const email = useSearchParams().get("email");

  const { replace } = useRouter();

  useEffect(() => {
    if (state?.error?.length) {
      toast.error(state.error);
    }

    if (state.ok) {
      toast.success("Email enviado com sucesso!");
      replace("/auth/sign-in-member");
    }
  }, [state, replace]);

  return (
    <form action={action} className="space-y-4 ">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          placeholder="admin@exemplo.com"
          defaultValue={email ?? ""}
          required
          type="email"
        />
      </div>

      <ButtonLoading>Enviar</ButtonLoading>
      <Button variant="ghost" className="w-full">
        <Link
          href="/auth/sign-in-member"
          className="inline-block w-full text-center text-sm "
        >
          Voltar
        </Link>
      </Button>
    </form>
  );
};
