"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthSigninButton } from "@/components/auth/auth-signin-button";

const formSignin = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Email deve ter no minimo 8 caracter."),
});

export default function SignInPage() {
  const form = useForm<z.infer<typeof formSignin>>({
    resolver: zodResolver(formSignin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSigninSubmit(values: z.infer<typeof formSignin>) {
    const { email, password } = values;
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>🔐 Acesse sua conta</CardTitle>
          <CardDescription>
            Faça login com seu e-mail e senha ou entre com sua conta do GitHub.
          </CardDescription>
          <CardAction>
            <Button variant="link">Registrar</Button>
          </CardAction>
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSigninSubmit)}
            className="space-y-8"
          >
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Digite seu e-mail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha:</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Entrar na conta
              </Button>
            </CardContent>
          </form>
          <CardFooter className="flex-col gap-2">
            <AuthSigninButton
              provider="github"
              className="w-full"
              title="Entrar com sua conta do GitHub"
            >
              Entrar com GitHub
            </AuthSigninButton>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
