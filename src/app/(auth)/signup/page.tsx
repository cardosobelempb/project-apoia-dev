"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
import { Input } from "@/components/ui/input";
import { LucideLock, LucideUser } from "lucide-react";

import { AuthSigninButton } from "@/components/auth/auth-signin-button";
import { formErrorHandler } from "@/shared/errors/form-error-handler";
import { SignupFormData, signupSchema } from "@/shared/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  // 3. Função de erro dinâmica
  const onSignupError = formErrorHandler<SignupFormData>();

  async function onSignupSubmit(data: SignupFormData) {
    const { email, password } = data;

    console.log("Login data:", data);
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
    toast.success("Login efetuado!");
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-3">
            <LucideUser /> Criar uma conta
          </CardTitle>
          <CardDescription>
            Preencha seus dados para criar uma conta ou entre com sua conta do
            GitHub.
          </CardDescription>
        </CardHeader>

        <form
          onSubmit={handleSubmit(onSignupSubmit, onSignupError)}
          className="space-y-3"
        >
          <CardContent className="space-y-3">
            <Label>Nome:</Label>
            <Input
              defaultValue=""
              placeholder="Digite seu nome"
              {...register("name")}
            />
            <Label>Email:</Label>
            <Input
              defaultValue=""
              type="email"
              placeholder="Digite seu e-mail"
              {...register("email")}
            />
            <Label>Senha:</Label>
            <Input
              defaultValue=""
              type="password"
              placeholder="Digite sua senha"
              {...register("password")}
            />
            {/* {errors.password && <span>{errors.password.message}</span>} */}
            <Button className="w-full" type="submit">
              Criar conta
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex-col gap-y-3">
          <AuthSigninButton
            provider="github"
            className="w-full"
            title="Entrar com sua conta do GitHub"
          >
            Criar com GitHub
          </AuthSigninButton>
          <Link
            className="w-full py-1.5 px-3 text-center rounded-md font-bold"
            href="/signin"
          >
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
