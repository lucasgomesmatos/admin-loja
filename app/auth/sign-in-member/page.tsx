import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Library } from "lucide-react";
import { Metadata } from "next";
import { FormSignInMember } from "../components/form-sign-in-member";

export const metadata: Metadata = {
  title: "Login",
};

export default function SignInMember() {
  return (
    <main className="flex h-screen justify-center items-center px-5">
      <Card className="mx-auto max-w-sm space-y-2">
        <CardHeader className="space-y-2 text-center flex flex-col items-center">
          <CardTitle className=" font-bold text-xl flex gap-2 items-center">
            <Library className="size-5" /> Lojinha de Atividades
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400 text-sm">
            Digite seu e-mail abaixo para ter acesso as atividades.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-96">
          <FormSignInMember />
        </CardContent>
      </Card>
    </main>
  );
}
