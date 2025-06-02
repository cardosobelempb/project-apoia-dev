import { FieldErrors, SubmitErrorHandler } from "react-hook-form";
import { toast } from "react-toastify";

type ShowMode = "first" | "all";
type ShowHandler = (message: string) => void;

interface HandleFormErrorOptions {
  mode?: ShowMode; // 'first' (padrão) ou 'all'
  handler?: ShowHandler; // função que mostra a mensagem (ex: toast, log, etc)
}

/**
 * Gera uma função genérica para tratamento de erros de formulário
 */
export function formErrorHandler<T extends Record<string, any>>(
  options?: HandleFormErrorOptions
): SubmitErrorHandler<T> {
  const mode = options?.mode ?? "first";
  const handler = options?.handler ?? ((msg) => toast.error(msg));

  return (errors: FieldErrors<T>) => {
    if (mode === "first") {
      const firstKey = Object.keys(errors)[0] as keyof T;
      const message = errors[firstKey]?.message;
      if (message) handler(String(message));
    } else {
      Object.values(errors).forEach((err) => {
        if (err?.message) handler(String(err.message));
      });
    }
  };
}
