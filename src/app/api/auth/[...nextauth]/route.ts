// route.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { prisma } from "@/shared/database/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Credentials({
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

        const valid = await compare(credentials.password, user.password);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name ?? "",
          email: user.email,
          image: user.image ?? undefined,
          // role: user.role, // 👈 incluído
          userName: user.userName ?? undefined, // 👈 fix: ensure type matches User
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }: { session: any; token?: any }) {
      console.log("Token =>", token);
      console.log("Session =>", session);
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

// handler deve vir depois
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
