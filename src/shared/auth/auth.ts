import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import GitHub from "next-auth/providers/github";

import { prisma } from "../database/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
});
