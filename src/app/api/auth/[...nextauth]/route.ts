import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import env from "@/env";

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: env.discordClientId,
      clientSecret: env.discordClientSecret,
    }),
  ],
});

export { handler as GET, handler as POST };
