'use client';

import { ButtonLoading } from '@/components/button-loading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import Link from 'next/link';

export const FormSignIn = () => {
  return (
    <form className="space-y-4 ">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          placeholder="admin@example.com"
          required
          type="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input name="password" required type="password" />
      </div>
      <ButtonLoading />
      <Link
        className="inline-block w-full text-center text-sm underline"
        href="#"
      >
        Esqueceu a senha?
      </Link>
    </form>
  );
};
