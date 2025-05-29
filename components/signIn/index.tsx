'use client'

import { type JSX, useActionState } from 'react'
import { Button, Input, Link, Form } from '@heroui/react'
import PasswordInput from '@components/passwordInput'

import { handleSubmit } from '@/lib/actions/authentication'

export default function SignIn(): JSX.Element {
  const [error, onSubmitForm, isLoading] = useActionState(handleSubmit, '')

  return (
    <Form action={onSubmitForm} className="space-y-10">
      <Input
        isRequired
        classNames={{ inputWrapper: 'dark:border-default-500' }}
        disabled={isLoading}
        errorMessage="Completa este campo"
        label="Correo electrónico"
        labelPlacement="outside"
        name="email"
        placeholder="tu@email.com"
        type="email"
        variant="bordered"
      />
      <PasswordInput disabled={isLoading} />
      <p className="text-danger-400 font-semibold text-lg text-center w-full">
        {error}
      </p>
      <Button
        className="w-full"
        color="primary"
        isLoading={isLoading}
        type="submit"
      >
        Ingresar
      </Button>
      <p className="flex w-full justify-center max-md:flex-col max-md:items-center">
        ¿Ya estás registrado?&nbsp;
        <Link className="font-bold" color="primary" href="/sign-up">
          Crear cuenta
        </Link>
      </p>
    </Form>
  )
}
