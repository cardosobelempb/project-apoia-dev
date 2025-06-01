"use client";
import { auth } from "@/shared/auth/auth";
import { redirect } from "next/navigation";

import React from "react";

export default async function AuthPrivate({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return <p>Você precisa estar autenticado.</p>;
  }
  return <div>{children}</div>;
}
