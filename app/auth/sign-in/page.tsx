import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Library } from 'lucide-react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { FormSignIn } from '../components/form-sign-in';

const ErrorToast = dynamic(() => import('@/components/error-toast'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Login',
};

export default function SignIn() {
  return (
    <main className="flex h-screen justify-center items-center px-5">
      <Card className="mx-auto max-w-sm space-y-6 ">
        <CardHeader className="space-y-2 text-center flex flex-col items-center">
          <CardTitle className=" font-bold text-xl flex gap-2 items-center">
            <Library className="size-5" /> Lojinha de Atividades
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400 text-sm">
            Digite suas credenciais abaixo para entrar no admin.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-96">
          <FormSignIn />
        </CardContent>
      </Card>
    </main>
  );
}
