import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession;
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    userName?: string;
    bio?: string;
    gender?: string | null;
    role?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
    userName?: string;
  }
}
