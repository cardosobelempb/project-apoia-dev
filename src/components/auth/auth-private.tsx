"use client";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import React from "react";

export default function AuthPrivate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  console.log("Session => ", session?.user);
  console.log("Session => ", session?.user.userName);
  console.log("Status => ", status);

  if (status === "loading") {
    return <Loading />;
  }

  if (!session?.user) {
    redirect("/");
  }
  return <div>{children}</div>;
}
