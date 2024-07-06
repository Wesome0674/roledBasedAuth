// auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GitHub from "next-auth/providers/github";
import authConfig from "./auth.config";

const prisma = new PrismaClient(); // generation du client prisma

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt", // strategie json web token pour pouvoir passer un role
  },
  adapter: PrismaAdapter(prisma), // adaptateur prisma 
  ...authConfig, // config creer dans auth.config.ts 
  callbacks: {
     async jwt({ token, user }) {
      return { ...token, ...user }; 
    },
     async session({ session, token }) {
      session.user.role = token.role as string; // on passe le role au token
      return session;
    },
    /* authorized: async ({ auth }) => {
      // Les utilisateurs connectés sont authentifiés, sinon redirigés vers la page de connexion
      return !!auth
    }, */
  },
});
