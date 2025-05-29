'use client'

import { type JSX } from 'react'
import { Form } from '@heroui/form'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Select, SelectItem } from '@heroui/select'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import { CreatePuzzleSchema, type FormCreatePuzzle } from '@lib/schemas/puzzle'
import { createPuzzle } from '@lib/actions/puzzle'
import { INotification } from '@/types/notification'

function CreatePuzzle(): JSX.Element {
  const session = useSession()
  const router = useRouter()

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormCreatePuzzle>({
    resolver: zodResolver(CreatePuzzleSchema),
    defaultValues: {
      title: '',
      topic: '',
    },
  })

  const onSubmit: SubmitHandler<FormCreatePuzzle> = async (data) => {
    const notification: INotification = {
      message: 'No se ha podido crear la sopa de letras',
      settings: { type: 'error', position: 'top-right' },
    }

    const response = await createPuzzle(data, session.data?.user?.id ?? '')

    if (!response) return toast(notification.message, notification.settings)

    notification.message = 'Sopa de letras creada!'
    notification.settings.type = 'success'

    toast(notification.message, notification.settings)

    router.push('/dashboard')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mt-6 mb-16 text-center">
        Crear sopa de letras
      </h1>
      <Form
        className="grid grid-cols-2 gap-y-10 gap-x-8 px-8"
        validationBehavior="native"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="col-span-2"
          errorMessage={errors.title?.message}
          isInvalid={!!errors.title?.message}
          label="Titulo"
          placeholder="Titulo de la sopa de letras"
          variant="bordered"
          {...register('title', { required: 'Este campo es requerido.' })}
        />
        <Input
          className="max-md:col-span-2"
          errorMessage={errors.topic?.message}
          isInvalid={!!errors.topic?.message}
          label="Tematica"
          placeholder="Ingresa las tematicas separadas por ,"
          variant="bordered"
          {...register('topic', { required: 'Este campo es requerido.' })}
        />
        <Input
          className="max-md:col-span-2"
          errorMessage={errors.numberOfQuestions?.message}
          isInvalid={!!errors.numberOfQuestions?.message}
          label="Número de columnas"
          placeholder="Minimo número de columnas es 15"
          type="number"
          variant="bordered"
          {...register('numberOfRows', { valueAsNumber: true })}
        />
        <Input
          className="max-md:col-span-2"
          errorMessage={errors.numberOfQuestions?.message}
          isInvalid={!!errors.numberOfQuestions?.message}
          label="Número de preguntas"
          placeholder="Minimo número de preguntas es 1"
          type="number"
          variant="bordered"
          {...register('numberOfQuestions', { valueAsNumber: true })}
        />
        <Select
          className="max-md:col-span-2"
          errorMessage={
            errors.difficult?.type !== 'invalid_enum_value'
              ? errors.difficult?.message
              : 'Debe seleccionar una opción.'
          }
          isInvalid={!!errors.difficult?.message}
          label="Dificultad"
          placeholder="Selecciona una opción"
          variant="bordered"
          {...register('difficult')}
        >
          <SelectItem key="easy">Fácil</SelectItem>
          <SelectItem key="medium">Medio</SelectItem>
          <SelectItem key="hard">Difícil</SelectItem>
        </Select>
        <div className="col-span-2 flex justify-center">
          <Button
            className="px-8 font-semibold text-medium"
            color="primary"
            type="submit"
          >
            Crear
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default CreatePuzzle
