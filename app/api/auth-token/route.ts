import { verifyToken } from "@/utils/functions/verify-token";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const urlApi = new URL("https://api.profbiodicas.com.br/token/refresh");
const urlRedirectLogin = new URL(
  "https://admin.profbiodicas.com.br/auth/sign-in-member"
);
const urlRedirectOrders = new URL(
  "https://admin.profbiodicas.com.br/dashboard/orders"
);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) redirect();

  const tokenValid = await verifyToken(token!);

  let refreshToken;

  if (!tokenValid) {
    const response = await fetch(urlApi, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) redirect();

    const data = await response.json();
    refreshToken = data.refreshToken;
  }

  const session = tokenValid ? token : refreshToken;

  cookies().set("session", session, {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  return NextResponse.redirect(urlRedirectOrders);
}

const redirect = () => {
  return NextResponse.redirect(urlRedirectLogin);
};
