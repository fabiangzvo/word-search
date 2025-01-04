"use client";

import { JSX } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Link,
  CardHeader,
} from "@nextui-org/react";

import PasswordInput from "@components/passwordInput";

export default function index(): JSX.Element {
  async function handleSubmit(formData: FormData): Promise<void> {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("username"),
        password: formData.get("password"),
        email: formData.get("email"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.error);
      return;
    }

    alert("Registration successful!");
  }

  return (
    <section id="register" className="py-24 px-6">
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
                type="text"
                name="username"
                label="Nombre de usuario"
                placeholder="user231"
                variant="bordered"
              />
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="tu@email.com"
                variant="bordered"
              />
              <PasswordInput />
              <Button type="submit" color="primary" className="w-full">
                Crear Cuenta
              </Button>
              <p className="flex w-full justify-center">
                ¿Ya estás registrado?&nbsp;
                <Link color="primary" href="/login" className="font-bold">
                  Iniciar sesión
                </Link>
              </p>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
