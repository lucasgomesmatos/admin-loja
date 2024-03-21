"use client";

import { signInUserMemberAction } from "@/app/actions/auth/sign-in-member";
import { ButtonLoading } from "@/components/button-loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

const initialState = {
  data: null,
  ok: false,
  error: "",
  isAdmin: false,
  email: "",
};

export const FormSignInMember = () => {
  const [state, action] = useFormState(signInUserMemberAction, initialState);

  const { replace } = useRouter();

  useEffect(() => {
    if (state.error.length) {
      toast.error(state.error);
    }

    if (state.ok) {
      replace("/dashboard/orders");
    }
  }, [state, replace]);

  return (
    <>
      <form action={action} className="space-y-4 ">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            data-error={Boolean(state.error.length)}
            className=" data-[error=true]:border-red-500"
            name="email"
            placeholder="admin@exemplo.com"
            required
            type="email"
          />
        </div>

        <ButtonLoading>Entrar</ButtonLoading>
        <Link
          className="inline-block w-full text-center text-sm underline"
          href="#"
        >
          Precisa de ajuda?
        </Link>
      </form>
    </>
  );
};
