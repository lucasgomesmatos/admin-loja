import { cookies } from "next/headers";
import { environment } from "./env";

export function api(path: string, init?: RequestInit) {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;

  const baseUrl = environment.NEXT_PUBLIC_API_BASE_URL;
  const apiPrefix = "/";
  const url = new URL(apiPrefix.concat(path), baseUrl);

  return fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}
