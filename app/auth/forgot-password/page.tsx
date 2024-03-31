import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Library } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";
import { FormForgotPassword } from "../components/form-forgot-password";

export const metadata: Metadata = {
  title: "Esqueceu a senha",
};

export default async function ForgotPassword() {
  return (
    <main className="flex h-screen justify-center items-center px-5">
      <Card className="mx-auto max-w-sm space-y-2">
        <CardHeader className="space-y-2 text-center flex flex-col items-center">
          <CardTitle className=" font-bold text-xl flex gap-2 items-center">
            <Library className="size-5" /> Lojinha de Atividades
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400 text-sm">
            Digite seu e-mail abaixo para recuperar seu acesso.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-96">
          <Suspense>
            <FormForgotPassword />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}
