import { NextRequest, NextResponse } from "next/server";
import { openSessionToken, verifyToken } from "./utils/functions/verify-token";

const publicRoutes = ["/auth/sign-in-member", "/auth/sign-in"];

const privateRoutes = [
  "/dashboard/home",
  "/dashboard/orders",
  "/dashboard/products",
  "/dashboard/users",
  "dashboard/categories",
];

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const admin = request.cookies.get("auth")?.value;

  const authenticated = session ? verifyToken(session) : false;
  const adminAuthenticated = admin ? verifyToken(admin) : false;

  if (
    authenticated &&
    !adminAuthenticated &&
    !request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return Response.redirect(new URL("/dashboard/orders", request.url));
  }

  if (authenticated && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/dashboard/home", request.url));
  }

  if (
    adminAuthenticated &&
    request.nextUrl.pathname.startsWith("/auth/sign-in-member")
  ) {
    const { email } = await openSessionToken(admin!);

    return NextResponse.redirect(
      new URL(`/auth/sign-in?email=${email}`, request.url)
    );
  }

  if (!authenticated && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!authenticated) {
    return NextResponse.redirect(new URL("/auth/sign-in-member", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
