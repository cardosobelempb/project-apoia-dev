// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      userName?: string | null;
      gender?: string | null;
      bio?: string | null;
      role?: string | null;
    };
  }

  interface User {
    id: string;
    userName?: string | null;
    gender?: string | null;
    bio?: string | null;
    role?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userName?: string;
    gender?: string;
    bio?: string;
    role?: string;
  }
}
