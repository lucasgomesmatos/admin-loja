'use server';

import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { redirect } from 'next/navigation';
import { createSessionToken } from '../services/auth-service';

export const signIn = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    redirect('/auth/sign-in/?error=invalid-credentials');
  }
  const doesPasswordMatches = await compare(password, user.password);

  if (!doesPasswordMatches) {
    redirect('/auth/sign-in/?error=invalid-credentials');
  }

  await createSessionToken({
    role: user.role,
    id: user.id,
  });

  redirect('/dashboard/home');
};
