import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes

const { DISCORD_CLIENT_ID = '' , DISCORD_CLIENT_SECRET=''} = process.env;
const handler = NextAuth({
    providers: [
        DiscordProvider({
            clientId: DISCORD_CLIENT_ID,
            clientSecret: DISCORD_CLIENT_SECRET,
        }),
    ],
})

export { handler as GET, handler as POST}