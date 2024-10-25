// auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";

const prisma = new PrismaClient(); // generation du client prisma

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "database", 
  },
  adapter: PrismaAdapter(prisma), 
  ...authConfig, 
  callbacks: {
    async jwt({ token, user }) {
      console.log(token);
      return { ...token, ...user };
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = token as any;
      }
      return session;
    },
  },

});
