"use client";

import { SubmitErrorHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";

import { AuthSigninButton } from "@/components/auth/auth-signin-button";
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
import { LucideLock } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { formErrorHandler } from "@/shared/errors/form-error-handler";

// 1. Define schema Zod
const signinSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha precisa de pelo menos 6 caracteres" }),
});

// 2. Infer type a partir do schema
type SigninFormData = z.infer<typeof signinSchema>;

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });
  // 3. Função de erro dinâmica
  const onSigninError = formErrorHandler<SigninFormData>();

  async function onSigninSubmit(data: SigninFormData) {
    const { email, password } = data;

    console.log("Login data:", data);
    toast.success("Login efetuado!");
    // await signIn("credentials", {
    //   email,
    //   password,
    //   callbackUrl: "/dashboard",
    // });
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-3">
            <LucideLock /> Acesse sua conta
          </CardTitle>
          <CardDescription>
            Faça login com seu e-mail e senha ou entre com sua conta do GitHub.
          </CardDescription>
          <CardAction className="flex items-center">
            <Button variant="link">Registrar</Button>
          </CardAction>
        </CardHeader>

        <form
          onSubmit={handleSubmit(onSigninSubmit, onSigninError)}
          className="space-y-8"
        >
          <CardContent className="space-y-8">
            <Input
              defaultValue=""
              type="email"
              placeholder="Digite seu e-mail"
              {...register("email")}
            />
            {/* {errors.email && <span>{errors.email.message}</span>} */}
            <Input
              defaultValue=""
              type="password"
              placeholder="Digite sua senha"
              {...register("password")}
            />
            {/* {errors.password && <span>{errors.password.message}</span>} */}
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
      </Card>
    </div>
  );
}
