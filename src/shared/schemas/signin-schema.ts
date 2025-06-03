import { z } from "zod";

// 1. Define schema Zod
export const signinSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha precisa de pelo menos 6 caracteres" }),
});

// 2. Infer type a partir do schema
export type SigninFormData = z.infer<typeof signinSchema>;
