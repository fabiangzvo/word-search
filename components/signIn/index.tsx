"use client";

import { JSX } from "react";
import { Button, Card, CardBody, Input, Link } from "@nextui-org/react";
import { signIn } from "next-auth/react";

import PasswordInput from "@components/passwordInput";

export default function index(): JSX.Element {
  async function handleSubmit(formData: FormData): Promise<void> {
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      callbackUrl: "/dashboard",
    });

    if (res?.error) {
      alert(res.error);
    }
  }

  return (
    <section id="register" className="py-24 px-6">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ingresa y empieza a jugar ahora
        </h2>
        <Card className="p-6">
          <CardBody>
            <form action={handleSubmit} className="space-y-4">
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
