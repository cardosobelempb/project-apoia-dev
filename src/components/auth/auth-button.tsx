"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { ReactNode } from "react";

type AuthButtonProps = {
  className: string;
  children: ReactNode;
};

export function AuthButton({ className, children }: AuthButtonProps) {
  const handleRegister = async () => {
    await signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <Button className={className} onClick={handleRegister}>
      {children}
    </Button>
  );
}
