import { environment } from "@/lib/env";
import { jwtVerify } from "jose";

export async function verifyToken(token: string) {
  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(environment.NEXT_PUBLIC_JWT_SECRET)
    );

    return true;
  } catch (error) {
    return false;
  }
}

export async function openSessionToken(token: string) {
  const secret = new TextEncoder().encode(environment.NEXT_PUBLIC_JWT_SECRET);
  const {
    payload: { email },
  } = await jwtVerify(token, secret);

  return {
    email,
  };
}
