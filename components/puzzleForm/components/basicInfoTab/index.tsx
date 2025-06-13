import { type JSX, useState, useCallback } from 'react'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Button } from '@heroui/button'
import { Alert } from '@heroui/alert'
import { Input, Textarea } from '@heroui/input'
import { Select, SelectItem } from '@heroui/select'
import { Sparkles } from 'lucide-react'

import { BasicInfoTabProps } from './types'

export function BasicInfoTab(props: BasicInfoTabProps): JSX.Element {
  const { errors, onCreateQuestions, register } = props

  const [isLoading, setIsLoading] = useState(false)

  const handleCreateQuestions = useCallback(async () => {
    setIsLoading(true)

    await onCreateQuestions()

    setIsLoading(false)
  }, [onCreateQuestions])

  return (
    <Card className="w-full bg-transparent" shadow="none">
      <CardBody className="grid grid-cols-2 gap-y-8 gap-x-8 px-8 w-full">
        <Alert
          hideIconWrapper
          classNames={{
            base: 'col-span-2 dark:bg-default-500/10 bg-default-100',
            title: 'font-bold',
            description: 'text-foreground-500',
          }}
          color="primary"
          description="Con base en el contexto, generaremos automáticamente las preguntas y respuestas para crear la sopa de letras. Podrás revisarlas y editarlas en el siguiente paso."
          icon={<Sparkles />}
          title="Generación automática"
          variant="flat"
        />
        <Input
          classNames={{
            inputWrapper: 'dark:border-default-500',
            base: 'max-md:col-span-2',
          }}
          errorMessage={errors.title?.message}
          isInvalid={!!errors.title?.message}
          label="Titulo"
          labelPlacement="outside"
          placeholder="Titulo de la sopa de letras"
          variant="bordered"
          {...register('title', {
            required: 'Este campo es requerido.',
          })}
        />
        <Select
          classNames={{
            trigger: 'dark:border-default-500',
            base: 'max-md:col-span-2',
            selectorIcon: 'text-default-500',
          }}
          errorMessage={
            errors.difficult?.type !== 'invalid_enum_value'
              ? errors.difficult?.message
              : 'Debe seleccionar una opción.'
          }
          isInvalid={!!errors.difficult?.message}
          label="Dificultad"
          labelPlacement="outside"
          placeholder="Selecciona una opción"
          variant="bordered"
          {...register('difficult')}
        >
          <SelectItem key="easy">Fácil</SelectItem>
          <SelectItem key="medium">Medio</SelectItem>
          <SelectItem key="hard">Difícil</SelectItem>
        </Select>
        <Textarea
          classNames={{
            inputWrapper: 'dark:border-default-500',
            base: 'col-span-2',
          }}
          errorMessage={errors.prompt?.message}
          isInvalid={!!errors.prompt?.message}
          label="Contexto"
          labelPlacement="outside"
          placeholder="Cuéntanos el tema de tu sopa de letras y deja que nuestra IA se encargue del resto"
          variant="bordered"
          {...register('prompt')}
        />
        <Input
          classNames={{
            inputWrapper: 'dark:border-default-500',
            base: 'max-md:col-span-2',
          }}
          errorMessage={errors.numberOfRows?.message}
          isInvalid={!!errors.numberOfRows?.message}
          label="Número de columnas"
          labelPlacement="outside"
          placeholder="Minimo número de columnas es 15"
          type="number"
          variant="bordered"
          {...register('numberOfRows', {
            valueAsNumber: true,
            min: 15,
            max: 27,
          })}
        />
        <Input
          classNames={{
            inputWrapper: 'dark:border-default-500',
            base: 'max-md:col-span-2',
          }}
          errorMessage={errors.numberOfQuestions?.message}
          isInvalid={!!errors.numberOfQuestions?.message}
          label="Número de preguntas"
          labelPlacement="outside"
          placeholder="Minimo número de preguntas es 1"
          type="number"
          variant="bordered"
          {...register('numberOfQuestions', { valueAsNumber: true })}
        />
      </CardBody>
      <CardFooter className="flex justify-end mt-4">
        <Button
          className="px-8 font-semibold text-medium"
          color="primary"
          isLoading={isLoading}
          onPress={handleCreateQuestions}
        >
          Siguiente
        </Button>
      </CardFooter>
    </Card>
  )
}
