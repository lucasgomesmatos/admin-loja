"use client";

import { signInUserAction } from "@/app/actions/auth/sign-in";
import { ButtonLoading } from "@/components/button-loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

const initialState = {
  data: null,
  ok: false,
  error: "",
};

export const FormSignIn = () => {
  const [state, action] = useFormState(signInUserAction, initialState);
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const email = useSearchParams().get("email");

  const { replace } = useRouter();

  useEffect(() => {
    if (state.error.length) {
      toast.error(state.error);
    }

    if (state.ok) {
      replace("/dashboard/home");
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
            placeholder="admin@example.com"
            defaultValue={email ?? ""}
            required
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>

          <div className="relative">
            <Input
              data-error={Boolean(state.error.length)}
              className=" data-[error=true]:border-red-500 appearance-none pr-8 "
              name="password"
              required
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

        <ButtonLoading>Entrar</ButtonLoading>
        <Link
          className="inline-block w-full text-center text-sm underline"
          href="#"
        >
          Esqueceu a senha?
        </Link>
      </form>
    </>
  );
};
