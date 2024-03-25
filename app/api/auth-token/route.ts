import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    const redirectURL = new URL(
      "https://admin.profbiodicas.com.br/auth/sign-in-member"
    );

    return NextResponse.redirect(redirectURL);
  }

  cookies().set("session", token, {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  const redirectURL = new URL(
    "https://admin.profbiodicas.com.br/dashboard/orders"
  );

  return NextResponse.redirect(redirectURL);
}
