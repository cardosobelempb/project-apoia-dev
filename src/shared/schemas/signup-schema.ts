import { z } from "zod";

// 1. Define schema Zod
export const signupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome precisa de pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha precisa de pelo menos 6 caracteres" }),
});

// 2. Infer type a partir do schema
export type SignupFormData = z.infer<typeof signupSchema>;
