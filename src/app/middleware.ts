import { auth } from "@/shared/auth/auth";
import { NextResponse } from "next/server";

export async function middleware(req: Request) {
  const session = await auth();

  const url = new URL(req.url);
  const protectedRoutes = ["/dashboard"];

  const isProtected = protectedRoutes.some((path) =>
    url.pathname.startsWith(path)
  );

  if (isProtected && !session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
