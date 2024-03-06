import { environment } from '@/lib/env';
import { cookies } from 'next/headers';

export const API_URL = environment.NEXT_PUBLIC_API_BASE_URL;

const token = cookies().get('token')?.value;

export const AUTH_SIGN_IN = <T>(body: any) => {
  return {
    url: `${API_URL}/sessions`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
};

export const GET_PROFILE = () => {
  return {
    url: `${API_URL}/me`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};
