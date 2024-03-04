import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/auth/sign-in'];

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('session')?.value;

  if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/dashboard/home', request.url));
  }

  if (!currentUser && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!currentUser) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
