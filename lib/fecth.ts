import { environment } from './env';

export function api(path: string, init?: RequestInit) {
  const API_URL = environment.NEXT_PUBLIC_API_BASE_URL;

  const apiPrefix = '/';
  const url = new URL(apiPrefix.concat(path), API_URL);

  return fetch(url, {
    ...init,
    credentials: 'include',
    headers: {
      ...init?.headers,

      'Content-Type': 'application/json',
    },
  });
}
