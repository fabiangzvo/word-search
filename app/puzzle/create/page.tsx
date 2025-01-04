"use client";

import { JSX } from "react";
import { Form } from "@nextui-org/form";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { CreatePuzzleSchema, FormCreatePuzzle } from "@lib/schemas/puzzle";
import { createPuzzle } from "@lib/actions/puzzle";

function CreatePuzzle(): JSX.Element {
  const session = useSession();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormCreatePuzzle>({
    resolver: zodResolver(CreatePuzzleSchema),
    defaultValues: {
      title: "",
      topic: "",
    },
  });

  const onSubmit: SubmitHandler<FormCreatePuzzle> = async (data) => {
    const response = await createPuzzle(data, session.data?.user?.id ?? "");

    if (!response)
      return toast("No se ha podido crear la sopa de letras", {
        type: "error",
        position: "bottom-right",
      });

    toast("Sopa de letras creada!", {
      type: "default",
      position: "bottom-right",
    });

    router.push("/dashboard");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mt-6 mb-16 text-center">
        Crear sopa de letras
      </h1>
      <Form
        validationBehavior="native"
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-y-10 gap-x-8 px-8"
      >
        <Input
          className="col-span-2"
          isInvalid={!!errors.title?.message}
          errorMessage={errors.title?.message}
          label="Titulo"
          placeholder="Titulo de la sopa de letras"
          variant="bordered"
          {...register("title", { required: "Este campo es requerido." })}
        />
        <Input
          isInvalid={!!errors.topic?.message}
          errorMessage={errors.topic?.message}
          label="Tematica"
          placeholder="Ingresa las tematicas separadas por ,"
          variant="bordered"
          {...register("topic", { required: "Este campo es requerido." })}
        />
        <Input
          isInvalid={!!errors.numberOfQuestions?.message}
          errorMessage={errors.numberOfQuestions?.message}
          label="Número de columnas"
          placeholder="Minimo número de columnas es 15"
          variant="bordered"
          type="number"
          {...register("numberOfRows", { valueAsNumber: true })}
        />
        <Input
          isInvalid={!!errors.numberOfQuestions?.message}
          errorMessage={errors.numberOfQuestions?.message}
          label="Número de preguntas"
          placeholder="Minimo número de preguntas es 1"
          variant="bordered"
          type="number"
          {...register("numberOfQuestions", { valueAsNumber: true })}
        />
        <Select
          label="Dificultad"
          variant="bordered"
          placeholder="Selecciona una opción"
          isInvalid={!!errors.difficult?.message}
          errorMessage={
            errors.difficult?.type !== "invalid_enum_value"
              ? errors.difficult?.message
              : "Debe seleccionar una opción."
          }
          {...register("difficult")}
        >
          <SelectItem key="easy">Fácil</SelectItem>
          <SelectItem key="medium">Medio</SelectItem>
          <SelectItem key="hard">Difícil</SelectItem>
        </Select>
        <div className="col-span-2 flex justify-center">
          <Button
            type="submit"
            color="primary"
            className="px-8 font-semibold text-medium"
          >
            Crear
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreatePuzzle;
