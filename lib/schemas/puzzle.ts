import { z } from "zod";

export const CreatePuzzleSchema = z.object({
  title: z.string().min(5, "El titulo debe contener minimo 5 caracteres."),
  difficult: z.enum(["easy", "medium", "hard"], {
    required_error: "Debe seleccionar una opción.",
    invalid_type_error: "Debe seleccionar una opción.",
  }),
  numberOfQuestions: z
    .number({ invalid_type_error: "Este campo es obligatorio." })
    .gte(1, "El minimo número de preguntas es de 1"),
  topic: z.string().regex(/\b\w+\b/, "Debe ingresar almenos una palabra"),
  numberOfRows: z
    .number({ invalid_type_error: "Este campo es obligatorio." })
    .min(15, "El minimo número de preguntas es de 15"),
});

export type FormCreatePuzzle = z.infer<typeof CreatePuzzleSchema>;
