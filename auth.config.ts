import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default {
  /* Types de conection: github, google ? */
  providers: [
    /* connection via github */
    GitHub({
      profile(profile) {
        return {
          /*information passe lors de la connection */
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          role: profile.role ?? "user",
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
