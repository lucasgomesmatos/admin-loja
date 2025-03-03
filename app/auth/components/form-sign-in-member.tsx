"use client";

import { signInUserMemberAction } from "@/app/actions/auth/auth-sign-in-member";
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
};

export const FormSignInMember = () => {
  const [state, action] = useFormState(signInUserMemberAction, initialState);

  const { replace } = useRouter();

  useEffect(() => {
    if (state?.error?.length) {
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
            name="email"
            placeholder="admin@exemplo.com"
            required
            type="email"
          />
        </div>

        <ButtonLoading>Entrar</ButtonLoading>
        <Link
          className="inline-block w-full text-center text-sm underline"
          href="https://api.whatsapp.com/send?phone=5531997434248&text=Preciso%20de%20ajuda?"
          target="_blank"
        >
          Precisa de ajuda?
        </Link>
      </form>
    </>
  );
};
