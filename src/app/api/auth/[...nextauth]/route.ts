import { nextOptions } from "@/lib/authOptions"
import NextAuth from "next-auth"
import { handlers } from "@/lib/auth";
export const { GET, POST } = handlers;

// eslint-disable-next-line
const handler = NextAuth(nextOptions)

