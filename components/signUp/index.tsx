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
    formState: { errors, isLoading },
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

        console.error(error.error)
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
    <Form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
      <Input
        classNames={{ inputWrapper: 'dark:border-default-500' }}
        isRequired
        errorMessage={errors.username?.message}
        isInvalid={!!errors.username?.message}
        label="Nombre de usuario"
        labelPlacement="outside"
        placeholder="randomUser"
        type="text"
        variant="bordered"
        {...register('username')}
      />
      <Input
        classNames={{ inputWrapper: 'dark:border-default-500' }}
        isRequired
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name?.message}
        label="Nombre completio"
        labelPlacement="outside"
        placeholder="John Doe"
        type="text"
        variant="bordered"
        {...register('name')}
      />
      <Input
        classNames={{ inputWrapper: 'dark:border-default-500' }}
        isRequired
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email?.message}
        label="Email"
        labelPlacement="outside"
        placeholder="tu@email.com"
        type="email"
        variant="bordered"
        {...register('email')}
      />
      <PasswordInput
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password?.message}
        {...register('password')}
      />
      <PasswordInput
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword?.message}
        label="Confirmar contraseña"
        {...register('confirmPassword')}
      />
      <Button
        className="w-full"
        color="primary"
        type="submit"
        isLoading={isLoading}
      >
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
