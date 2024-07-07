// auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";

const prisma = new PrismaClient(); // generation du client prisma

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt", 
  },
  adapter: PrismaAdapter(prisma), 
  ...authConfig, 
  callbacks: {
    jwt({ token, user}) {
      console.log(token)
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({session, token}) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session
    }
  },
});
