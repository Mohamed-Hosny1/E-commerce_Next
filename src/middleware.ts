import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const isSecure = process.env.NODE_ENV === "production";
  const cookieName = isSecure
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET!,
    salt: cookieName,
  });

  const { pathname } = request.nextUrl;

  const authPages = pathname === "/login" || pathname === "/register";

  if (token && authPages) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && !authPages) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/allorders", "/brands", "/wishlist", "/login", "/register"],
};