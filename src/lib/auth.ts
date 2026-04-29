import NextAuth from "next-auth";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { nextOptions } from "./authOptions";

export async function getUserToken() {
  const cookieStore = await cookies();

  const isSecure = process.env.NODE_ENV === "production";
  const cookieName = isSecure
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

  const decodedToken = cookieStore.get(cookieName)?.value;

  if (!decodedToken) return null;

  const token = await decode({
    token: decodedToken,
    secret: process.env.AUTH_SECRET!,
    salt: cookieName,
  });

  return token?.token as string;
}

export const { auth, handlers, signIn, signOut } = NextAuth(nextOptions);