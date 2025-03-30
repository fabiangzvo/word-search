'use client'

import { type JSX, useActionState } from 'react'
import {
  Button,
  Card,
  CardBody,
  Input,
  Link,
  CardHeader,
} from '@nextui-org/react'
import PasswordInput from '@components/passwordInput'

import { handleSubmit } from '@/lib/actions/authentication'

export default function SignIn(): JSX.Element {
  const [error, onSubmitForm, isLoading] = useActionState(handleSubmit, '')

  return (
    <section className="py-24 px-6" id="register">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="p-6">
          <CardHeader className="flex justify-center">
            <h2 className="text-3xl font-bold mb-8">
              Ingresa y empieza a jugar ahora
            </h2>
          </CardHeader>
          <CardBody>
            <form action={onSubmitForm} className="space-y-8">
              <Input
                isRequired
                disabled={isLoading}
                errorMessage="Completa este campo"
                label="Email"
                name="email"
                placeholder="tu@email.com"
                type="email"
                variant="bordered"
              />
              <PasswordInput disabled={isLoading} />
              <p className="text-danger-400 font-semibold text-lg text-center">
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
              <p className="flex w-full justify-center">
                ¿Ya estás registrado?&nbsp;
                <Link className="font-bold" color="primary" href="/#register">
                  Crear cuenta
                </Link>
              </p>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  )
}
