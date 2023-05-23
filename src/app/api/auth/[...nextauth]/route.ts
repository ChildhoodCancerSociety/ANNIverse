import { PrismaAdapter } from "@next-auth/prisma-adapter";

import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import env from "@/env";
import prisma from "@/prisma";

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.discordClientId,
      clientSecret: env.discordClientSecret,
    }),
  ],
});

export { handler as GET, handler as POST };
