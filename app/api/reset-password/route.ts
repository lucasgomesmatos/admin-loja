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

  const redirectURL = new URL(
    `https://admin.profbiodicas.com.br/auth/reset-password?token=${token}`
  );

  return NextResponse.redirect(redirectURL);
}
