// On etant les info recu de la connection pour y rajouter le role sur le token
import NextAuth from "next-auth";
import { User } from "@prisma/client";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
 
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  type JWT = User;
}
