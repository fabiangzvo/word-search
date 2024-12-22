import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(4, {
    message: "El nombre de usuario debe tener al menos 4 caracteres.",
  }),
  email: z
    .string()
    .email({ message: "Debe ser un correo electrónico válido." }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .max(64, { message: "La contraseña no puede exceder los 64 caracteres." })
    .refine((value) => /[A-Z]/.test(value), {
      message: "La contraseña debe contener al menos una letra mayúscula.",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "La contraseña debe contener al menos una letra minúscula.",
    })
    .refine((value) => /\d/.test(value), {
      message: "La contraseña debe contener al menos un número.",
    }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
