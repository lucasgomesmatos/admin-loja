'use server';

import { environment } from '@/lib/env';
import { apiError } from '@/utils/functions/api-error';
import { cookies } from 'next/headers';

export async function signInUserAction(state: {}, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await fetch(
      `${environment.NEXT_PUBLIC_API_BASE_URL}/sessions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      },
    );

    console.log(response);

    if (!response.ok) {
      throw new Error('Email ou senha inválidas');
    }

    const data = await response.json();

    cookies().set('token', data.refreshToken, {
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return {
      data: null,
      ok: true,
      error: '',
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
