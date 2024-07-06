// On etant les info recu de la connection pour y rajouter le role sur le token
import NextAuth, { DefaultSession } from "next-auth";
import { User } from "@prisma/client";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
 
  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  type JWT = User;
}
