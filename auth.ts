// auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";

const prisma = new PrismaClient(); // generation du client prisma

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt", // strategie json web token pour pouvoir passer un role
  },
  adapter: PrismaAdapter(prisma), // adaptateur prisma
  ...authConfig, // config creer dans auth.config.ts
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.role = token.role as string | null | undefined;
      }
      return session;
    },
  },
});
