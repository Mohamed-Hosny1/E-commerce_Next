import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const session = req.auth;
  const { pathname } = req.nextUrl;

  const authPages = pathname === "/login" || pathname === "/register";

  if (session && authPages) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!session && !authPages) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/cart", "/allorders", "/brands", "/wishlist", "/login", "/register"],
};