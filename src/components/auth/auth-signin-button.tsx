"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { ReactNode } from "react";

type AuthSigninButtonProps = {
  className: string;
  children: ReactNode;
  provider?: "github" | "google";
  title?: string;
};

export function AuthSigninButton({
  className,
  provider,
  title,
  children,
}: AuthSigninButtonProps) {
  const handleRegister = async () => {
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <Button className={className} onClick={handleRegister} title={title}>
      {children}
    </Button>
  );
}
