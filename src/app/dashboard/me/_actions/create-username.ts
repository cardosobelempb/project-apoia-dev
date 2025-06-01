"use server";

import { z } from "zod";

const createUsernameSchema = z.object({
  userName: z.string().min(9, "Use name deve ter no minimo 4 caracter."),
});

type createUsernameFormData = z.infer<typeof createUsernameSchema>;

export async function createUsername(data: createUsernameFormData) {
  const schema = createUsernameSchema.safeParse(data);

  if (!schema.success) {
    console.log(schema);
    return {
      data: null,
      error: schema.error.issues[0].message,
    };
  }

  return {
    data: "Seu username foi atualizado com sucesso.",
    error: null,
  };
}
