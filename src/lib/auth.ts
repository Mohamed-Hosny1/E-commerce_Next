import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const decodedToken = (await cookies()).get("next-auth.session-token")?.value;
  const token = await decode({
  token: decodedToken,
  secret: process.env.AUTH_SECRET!,
  salt: "next-auth.session-token",
});


  return token?.token as string;
}


