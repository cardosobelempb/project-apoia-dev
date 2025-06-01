"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  LucideFileWarning,
  LucideSave,
  LucideShieldAlert,
  LucideWindArrowDown,
  Terminal,
} from "lucide-react";
import { createUsername } from "@/app/dashboard/me/_actions/create-username";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { toast, Toaster } from "sonner";
import { showToast } from "../shared/toast-root/toast-root";

const formUrlPreview = z.object({
  userName: z.string().min(8, "Use name deve ter no minimo 8 caracter."),
});

export default function UrlPreview() {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formUrlPreview>>({
    resolver: zodResolver(formUrlPreview),
    defaultValues: {
      userName: session?.user.userName ?? "",
    },
  });

  async function onUrlSubmit(values: z.infer<typeof formUrlPreview>) {
    const { userName } = values;

    if (userName === "") {
      return;
    }

    const response = await createUsername({ userName });

    showToast({
      description: response.error || "",
      type: "success",
    });
    console.log(response.error);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
      <p className="text-sm font-semibold text-white bg-gray-800 px-4 py-2 rounded w-full break-all">
        {`${process.env.NEXT_PUBLIC_HOST_URL}/creator/${session?.user.userName}`}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onUrlSubmit)}
          className="flex items-center gap-3 w-full"
        >
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Digite seu username"
                    className="flex-1 text-white bg-gray-900 border border-gray-700 rounded px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            aria-label="Salvar username"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex-shrink-0"
          >
            <LucideSave className="w-4 h-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
