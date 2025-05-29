import { z } from 'zod'

import { userExist } from '@lib/queries/user'

export const RegisterUserSchema = z
  .object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    username: z
      .string()
      .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
      .refine(
        async (value) => await userExist({ username: value }),
        'El nombre de usuario ya existe'
      ),
    email: z
      .string()
      .email('Correo inválido')
      .refine(
        async (value) => await userExist({ email: value }),
        'Ya existe una cuenta registrada con este correo'
      ),
    password: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(16, 'La contraseña debe tener un máximo de 16 caracteres')
      .refine(
        (value) => /[A-Z]/.test(value),
        'La contrasela debe contener por lo menos un caracter en mayúscula'
      )
      .refine(
        (value) => /[a-z]/.test(value),
        'La contrasela debe contener por lo menos un caracter en minuscula'
      )
      .refine(
        (value) => /\d/.test(value),
        'La contrasela debe contener por lo menos un número'
      )
      .refine(
        (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
        'La contrasela debe contener por lo menos un caracter en especial'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export type RegisterUserType = z.infer<typeof RegisterUserSchema>
