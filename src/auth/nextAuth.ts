import { PrismaAdapter } from "@next-auth/prisma-adapter";

import NextAuth, { getServerSession } from "next-auth";
import type { AuthOptions, TokenSet } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import env from "@/env";
import prisma from "@/prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.discordClientId,
      clientSecret: env.discordClientSecret,
      authorization: {
        params: {
          scope: "identity email guilds",
        },
      },
      // style: {
      //   logo: "",
      //   logoDark: "",
      //   bg: "",
      //   bgDark: "",
      //   text: "",
      //   textDark: "",
      // },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const discord = await prisma.account.findFirst({
        // need to verify that this provider string is correct
        where: { userId: user.id, provider: "discord" },
      });
      if (
        discord &&
        (discord.expires_at ?? 0) * 1000 < Date.now() &&
        discord.refresh_token
      ) {
        try {
          const response = await fetch("https://discord.com/api/oauth2/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: env.discordClientId,
              client_secret: env.discordClientSecret,
              grant_type: "refresh_token",
              refresh_token: discord.refresh_token,
            }),
            method: "POST",
          });

          const tokens: TokenSet = await response.json();

          if (!response.ok) throw tokens;

          await prisma.account.update({
            data: {
              access_token: tokens.access_token,
              expires_at: Math.floor(
                Date.now() / 1000 + (tokens.expires_in as number)
              ),
              refresh_token: tokens.refresh_token ?? discord.refresh_token,
            },
            where: {
              provider_providerAccountId: {
                provider: "discord",
                providerAccountId: discord.providerAccountId,
              },
            },
          });
        } catch (e) {
          console.error("Error refreshing access token", e);
          // The error property will be used client-side to handle the refresh token error
          // eslint-disable-next-line no-param-reassign
          session.error = "RefreshAccessTokenError";
        }
      } else {
        const allAccts = await prisma.account.findMany();
        console.log(allAccts);
      }
      return session;
    },
  },
};

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
export const authHandler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.discordClientId,
      clientSecret: env.discordClientSecret,
    }),
  ],
});

export const getSession = () => getServerSession(authOptions);

declare module "next-auth/core/types" {
  interface Session {
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}
