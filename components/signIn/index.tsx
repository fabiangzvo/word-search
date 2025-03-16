'use client'

import { type JSX } from 'react'
import {
  Button,
  Card,
  CardBody,
  Input,
  Link,
  CardHeader,
} from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import PasswordInput from '@components/passwordInput'

export default function index(): JSX.Element {
  async function handleSubmit(formData: FormData): Promise<void> {
    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      callbackUrl: '/dashboard',
    })

    if (res?.error) {
      alert(res.error)
    }
  }

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
            <form action={handleSubmit} className="space-y-8">
              <Input
                label="Email"
                name="email"
                placeholder="tu@email.com"
                type="email"
                variant="bordered"
              />
              <PasswordInput />
              <Button className="w-full" color="primary" type="submit">
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
