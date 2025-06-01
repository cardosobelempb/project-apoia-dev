// route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { prisma } from "@/shared/database/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        // Retornar apenas os campos necessários para o token
        return {
          id: user.id,
          name: user.name ?? undefined,
          userName: user.userName ?? undefined,
          email: user.email ?? undefined,
          image: user.image ?? undefined,
          gender: user.gender ?? undefined,
          bio: user.bio ?? undefined,
          role: user.role ?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.userName = user.userName ?? undefined;
        token.image = user.image;
        token.gender = user.gender ?? undefined;
        token.bio = user.bio ?? undefined;
        token.role = user.role ?? undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.userName = token.userName as string;
        session.user.gender = token.gender as string;
        session.user.bio = token.bio as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
