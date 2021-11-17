import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { MainPaths } from '@Enums/paths/main-paths.enum';

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    redirect({ url, baseUrl }) {
      if (url === `${baseUrl}${MainPaths.INDEX}`)
        return new URL(MainPaths.BOOKS, baseUrl).toString();

      return url;
    },
  },
});
