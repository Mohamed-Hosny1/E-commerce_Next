import NextAuth from "next-auth";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { nextOptions } from "./authOptions";

export async function getUserToken() {
  const cookieStore = await cookies();
  const decodedToken = cookieStore.get("authjs.session-token")?.value;

  if (!decodedToken) return null;

  const token = await decode({
    token: decodedToken,
    secret: process.env.AUTH_SECRET!,
    salt: "authjs.session-token",
  });

  return token?.token as string;
}
export const { auth, handlers, signIn, signOut } = NextAuth(nextOptions);


