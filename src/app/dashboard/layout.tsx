import AuthPrivate from "@/components/auth/auth-private";
import { Header } from "./_components/header";
import { SessionAuthProvider } from "@/components/auth/session-auth.provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionAuthProvider>
      <AuthPrivate>
        <Header />
        <main className="w-full max-w-7xl mx-auto">{children}</main>
      </AuthPrivate>
    </SessionAuthProvider>
  );
}
