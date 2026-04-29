import type { NextAuthConfig } from "next-auth";

// هذا الملف edge-compatible — بدون Node.js APIs
// يُستخدم في middleware فقط
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = (user as { token?: string }).token;
        token.user = (user as { user?: unknown }).user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as typeof session.user;
      }
      return session;
    },
    authorized({ auth }) {
      return !!auth;
    },
  },
};