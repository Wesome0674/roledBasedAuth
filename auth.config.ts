import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default {
  /* Types de conection: github, google ? */
  providers: [
    /* connection via github */
    GitHub({
      profile(profile) {
        return {
          id: profile.id.toString(), // Convertir l'ID en chaîne de caractères
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: profile.role ?? "user",
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
