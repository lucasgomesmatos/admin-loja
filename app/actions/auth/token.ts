import { environment } from "@/lib/env";
import { UserRole } from "@/utils/types/user";
import * as jwt from "jose";
import { cookies } from "next/headers";

export async function openSessionToken(token: string) {
  const secret = new TextEncoder().encode(environment.NEXT_PUBLIC_JWT_SECRET);
  const { payload } = await jwt.jwtVerify(token, secret);

  return payload;
}

export async function createSessionLogin(
  name: string,
  token: string,
  email?: string
) {
  const secret = new TextEncoder().encode(environment.NEXT_PUBLIC_JWT_SECRET);

  const { role } = await openSessionToken(token);

  if (role === UserRole.ADMIN) {
    const admin = await new jwt.SignJWT({ role, email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    cookies().set(name, admin, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
  } else {
    cookies().set("session", token, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
  }
}
