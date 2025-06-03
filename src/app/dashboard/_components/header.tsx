import Link from "next/link";
import { HandCoins, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./menu-mobile";
import { AuthSignOutButton } from "@/components/auth/auth-signout-button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between w-full px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-semibold">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-amber-500"
          >
            <HandCoins className="h-6 w-6 mr-2" />
            <span className="text-xl font-bold">ApoiaDev</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/me"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Meu perfil
          </Link>

          <AuthSignOutButton className="justify-start px-0 text-red-500 hover:text-red-600 hover:bg-transparent cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
          </AuthSignOutButton>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
