'use client'

import { type JSX, useCallback } from 'react'
import { Button, Form, Input, Link } from '@heroui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import PasswordInput from '@components/passwordInput'
import type { INotification } from '@/types/notification'
import { type RegisterUserType, RegisterUserSchema } from '@schemas/user'

export default function SignUp(): JSX.Element {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserType>({
    resolver: zodResolver(RegisterUserSchema),
  })

  const onSubmit = useCallback(
    async (formData: RegisterUserType) => {
      const notification: INotification = {
        message: 'Usuario creado!',
        settings: { type: 'success', position: 'top-right' },
      }
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.username,
          password: formData.password,
          email: formData.email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        const error = await res.json()

        console.log(error.error)
        notification.message = 'No se ha podido crear el usuario.'
        notification.settings.type = 'error'

        toast(notification.message, notification.settings)

        return
      }

      toast(notification.message, notification.settings)
      router.push('/login')
    },
    [router]
  )

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <Input
        label="Nombre de usuario"
        placeholder="randomUser"
        type="text"
        variant="bordered"
        labelPlacement="outside"
        isRequired
        isInvalid={!!errors.username?.message}
        errorMessage={errors.username?.message}
        {...register('username')}
      />
      <Input
        label="Nombre completio"
        placeholder="John Doe"
        type="text"
        variant="bordered"
        labelPlacement="outside"
        isRequired
        isInvalid={!!errors.name?.message}
        errorMessage={errors.name?.message}
        {...register('name')}
      />
      <Input
        label="Email"
        placeholder="tu@email.com"
        type="email"
        variant="bordered"
        labelPlacement="outside"
        isRequired
        isInvalid={!!errors.email?.message}
        errorMessage={errors.email?.message}
        {...register('email')}
      />
      <PasswordInput
        isInvalid={!!errors.password?.message}
        errorMessage={errors.password?.message}
        {...register('password')}
      />
      <PasswordInput
        label="Confirmar contraseña"
        isInvalid={!!errors.confirmPassword?.message}
        errorMessage={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Button className="w-full" color="primary" type="submit">
        Crear Cuenta
      </Button>
      <p className="flex w-full justify-center max-md:flex-col max-md:items-center">
        ¿Ya estás registrado?&nbsp;
        <Link className="font-bold" color="primary" href="/login">
          Iniciar sesión
        </Link>
      </p>
    </Form>
  )
}
