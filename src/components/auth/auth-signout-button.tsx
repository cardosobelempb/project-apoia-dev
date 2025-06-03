"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { ReactNode } from "react";

type AuthSignOutButtonProps = {
  className: string;
  children: ReactNode;
  title?: string;
};

export function AuthSignOutButton({
  className,
  title,
  children,
}: AuthSignOutButtonProps) {
  const handleAuthSignup = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Button
      variant="ghost"
      className={className}
      onClick={handleAuthSignup}
      title={title}
    >
      {children}
    </Button>
  );
}
