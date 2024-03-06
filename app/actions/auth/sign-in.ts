'use server';

import { AUTH_SIGN_IN } from '@/utils/functions/api';
import { apiError } from '@/utils/functions/api-error';
import { cookies } from 'next/headers';

export async function signInUser(state: {}, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const request = AUTH_SIGN_IN({ email, password });

    const response = await fetch(request.url, {
      ...request,
    });

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
