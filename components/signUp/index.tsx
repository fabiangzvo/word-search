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
import PasswordInput from '@components/passwordInput'

export default function index(): JSX.Element {
  async function handleSubmit(formData: FormData): Promise<void> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get('username'),
        password: formData.get('password'),
        email: formData.get('email'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const error = await res.json()

      alert(error.error)

      return
    }

    alert('Registration successful!')
  }

  return (
    <section className="py-24 px-6" id="register">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="p-6">
          <CardHeader className="flex justify-center">
            <h2 className="text-3xl font-bold mb-8">
              Regístrate y empieza a jugar ahora
            </h2>
          </CardHeader>
          <CardBody>
            <form action={handleSubmit} className="space-y-8">
              <Input
                label="Nombre de usuario"
                name="username"
                placeholder="user231"
                type="text"
                variant="bordered"
              />
              <Input
                label="Email"
                name="email"
                placeholder="tu@email.com"
                type="email"
                variant="bordered"
              />
              <PasswordInput />
              <Button className="w-full" color="primary" type="submit">
                Crear Cuenta
              </Button>
              <p className="flex w-full justify-center">
                ¿Ya estás registrado?&nbsp;
                <Link className="font-bold" color="primary" href="/login">
                  Iniciar sesión
                </Link>
              </p>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  )
}
