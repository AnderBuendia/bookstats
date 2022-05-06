import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@Lib/utils/prisma.utils';
import { MainPaths } from '@Enums/paths/main-paths.enum';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    redirect({ url, baseUrl }) {
      if (url === `${baseUrl}${MainPaths.INDEX}`)
        return new URL(MainPaths.BOOKS, baseUrl).toString();

      return url;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.uid = user.id;
      }

      return token;
    },
    async session({ session, user, token }) {
      session.uid = user.id;

      return session;
    },
  },
});
