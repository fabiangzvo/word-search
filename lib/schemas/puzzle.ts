import { z } from 'zod'

export const CreatePuzzleSchema = z.object({
  title: z.string().min(5, 'El titulo debe contener minimo 5 caracteres.'),
  difficult: z.enum(['easy', 'medium', 'hard'], {
    required_error: 'Debe seleccionar una opción.',
    invalid_type_error: 'Debe seleccionar una opción.',
  }),
  numberOfQuestions: z
    .number({ invalid_type_error: 'Este campo es obligatorio.' })
    .gte(1, 'El minimo número de preguntas es de 1')
    .max(20, 'El maximo número de preguntas es de 20'),
  categories: z.array(
    z.string().min(3, 'La categoria debe contener minimo 3 caracteres')
  ),
  numberOfRows: z
    .number({ invalid_type_error: 'Este campo es obligatorio.' })
    .min(15, 'El minimo número de filas es de 15')
    .max(27, 'El máximo número de filas es de 27'),
  description: z
    .string()
    .min(20, 'La descripción debe tener un minimo de 20 caracteres'),
  prompt: z
    .string()
    .min(20, 'el contexto debe tener un minimo de 20 caracteres'),
  questions: z
    .array(
      z.object({
        label: z.string().min(1, 'La pregunta es requerida'),
        answer: z
          .string()
          .trim()
          .min(1, 'La respuesta es requerida')
          .regex(
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/,
            'La respuesta debe ser una sola palabra sin espacios ni caracteres especiales'
          ),
      })
    )
    .min(1, 'Debe agregar al menos una pregunta'),
  matrix: z.array(z.array(z.string())).min(15).max(27),
})

export type FormCreatePuzzleType = z.infer<typeof CreatePuzzleSchema>
