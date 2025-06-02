'use client'

import { type JSX, useState, useCallback } from 'react'
import { Form } from '@heroui/form'
import { Button } from '@heroui/button'
import { Input, Textarea } from '@heroui/input'
import { Select, SelectItem } from '@heroui/select'
import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Tabs, Tab } from '@heroui/tabs'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Trash2, Sparkles } from 'lucide-react'
import { Alert } from '@heroui/alert'

import { CreatePuzzleSchema, type FormCreatePuzzle } from '@lib/schemas/puzzle'
import { createPuzzle } from '@lib/actions/puzzle'
import { INotification } from '@/types/notification'
import Stepper from '@components/stepper'
import { GenerateQuestions } from '@lib/gemini'

const TabItems = [
  { title: 'Información esencial', key: 'main' },
  { title: 'Modificar información', key: 'edit' },
  { title: 'Finalizar creación', key: 'confirm' },
]

function CreatePuzzle(): JSX.Element {
  const [selected, setSelected] = useState('main')

  const session = useSession()
  const router = useRouter()

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    trigger,
    getValues,
    setValue,
  } = useForm<FormCreatePuzzle>({
    resolver: zodResolver(CreatePuzzleSchema),
    defaultValues: {
      title: '',
      topics: [],
      questions: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
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

  const onCreateQuestions = useCallback(async () => {
    const isFilled = await trigger([
      'title',
      'prompt',
      'difficult',
      'numberOfQuestions',
      'numberOfRows',
    ])

    if (!isFilled) return

    const [context, numberOfQuestions] = getValues([
      'prompt',
      'numberOfQuestions',
    ])

    const response = await GenerateQuestions(numberOfQuestions, context)

    setValue('description', response.description)
    append(
      response.questions.map(({ label, answer }) => ({
        question: label,
        answer,
      }))
    )

    setSelected('edit')
  }, [trigger, append])

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Crear&nbsp;
        <span className="bg-gradient-to-r from-primary-500 via-primary-300 to-primary-600 bg-clip-text text-transparent dark:to-purple-600 dark:via-rose-500">
          sopa de letras
        </span>
      </h2>
      <Stepper
        steps={TabItems}
        currentStep={TabItems.findIndex((item) => selected === item.key)}
      />
      <Form
        className="w-full"
        validationBehavior="native"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Tabs selectedKey={selected} classNames={{ tabList: 'hidden' }}>
          <Tab key="main" className="w-full">
            <Card className="w-full bg-transparent" shadow="none">
              <CardBody className="grid grid-cols-2 gap-y-8 gap-x-8 px-8 w-full">
                <Alert
                  hideIconWrapper
                  icon={<Sparkles />}
                  title="Generación automática"
                  description="Con base en el contexto, generaremos automáticamente las preguntas y respuestas para crear la sopa de letras. Podrás revisarlas y editarlas en el siguiente paso."
                  variant="flat"
                  color="primary"
                  classNames={{
                    base: 'col-span-2 dark:bg-default-500/10 bg-default-100',
                    title: 'font-bold',
                    description: 'text-gray-600 dark:text-gray-400',
                  }}
                />
                <Input
                  classNames={{
                    inputWrapper: 'dark:border-default-500',
                    base: 'max-md:col-span-2',
                  }}
                  errorMessage={errors.title?.message}
                  isInvalid={!!errors.title?.message}
                  label="Titulo"
                  placeholder="Titulo de la sopa de letras"
                  variant="bordered"
                  labelPlacement="outside"
                  {...register('title', {
                    required: 'Este campo es requerido.',
                  })}
                />
                <Select
                classNames={{
                  trigger: 'dark:border-default-500',
                  base: 'max-md:col-span-2',
                  selectorIcon:"text-default-500"
                }}
                  errorMessage={
                    errors.difficult?.type !== 'invalid_enum_value'
                      ? errors.difficult?.message
                      : 'Debe seleccionar una opción.'
                  }
                  isInvalid={!!errors.difficult?.message}
                  label="Dificultad"
                  placeholder="Selecciona una opción"
                  variant="bordered"
                  labelPlacement="outside"
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
                  placeholder="Cuéntanos el tema de tu sopa de letras y deja que nuestra IA se encargue del resto"
                  variant="bordered"
                  labelPlacement="outside"
                  {...register('prompt')}
                />
                <Input
                  classNames={{
                    inputWrapper: 'dark:border-default-500',
                    base: 'max-md:col-span-2',
                  }}
                  errorMessage={errors.numberOfQuestions?.message}
                  isInvalid={!!errors.numberOfQuestions?.message}
                  label="Número de columnas"
                  placeholder="Minimo número de columnas es 15"
                  type="number"
                  variant="bordered"
                  labelPlacement="outside"
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
                  placeholder="Minimo número de preguntas es 1"
                  type="number"
                  variant="bordered"
                  labelPlacement="outside"
                  {...register('numberOfQuestions', { valueAsNumber: true })}
                />
              </CardBody>
              <CardFooter className="flex justify-end mt-4">
                <Button
                  className="px-8 font-semibold text-medium"
                  color="primary"
                  onPress={onCreateQuestions}
                >
                  Siguiente paso
                </Button>
              </CardFooter>
            </Card>
          </Tab>
          <Tab key="edit" className="w-full">
            <Card className="w-full " shadow="none">
              <CardBody className="grid grid-cols-2 gap-y-10 gap-x-8 px-8 w-full">
                <div className="col-span-2 flex justify-end">
                  <Button
                    className="mt-4"
                    color="primary"
                    onPress={() => append({ question: '', answer: '' })}
                  >
                    Agregar pregunta
                  </Button>
                </div>
                {fields.map((field, index) => (
                  <Card key={field.id} className="">
                    <CardBody className="mt-4">
                      <Input
                        className="max-md:col-span-2"
                        errorMessage={
                          errors.questions?.[index]?.question?.message
                        }
                        isInvalid={
                          !!errors.questions?.[index]?.question?.message
                        }
                        placeholder="Escribe tu pregunta"
                        variant="bordered"
                        labelPlacement="outside"
                        label="Pregunta"
                        {...register(`questions.${index}.question`)}
                      />
                      <Input
                        label="Repuesta"
                        className="max-md:col-span-2"
                        errorMessage={
                          errors.questions?.[index]?.answer?.message
                        }
                        isInvalid={!!errors.questions?.[index]?.answer?.message}
                        placeholder="Escribe la respuesta"
                        variant="bordered"
                        labelPlacement="outside"
                        {...register(`questions.${index}.answer`)}
                      />
                    </CardBody>
                    <CardFooter className="flex justify-end items-center">
                      <Button
                        color="danger"
                        size="sm"
                        variant="light"
                        onPress={() => remove(index)}
                        isIconOnly
                      >
                        <Trash2 />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </CardBody>
              <CardFooter className="flex justify-between">
                <Button
                  className="px-8 font-semibold text-medium"
                  color="primary"
                  onPress={() => setSelected('main')}
                >
                  Anterior paso
                </Button>
                <Button
                  className="px-8 font-semibold text-medium"
                  color="primary"
                  onPress={() => setSelected('confirm')}
                >
                  Siguiente paso
                </Button>
              </CardFooter>
            </Card>
          </Tab>
          <Tab key="confirm" className="w-full">
            <Card className="w-full " shadow="none">
              <CardBody className="grid grid-cols-2 gap-y-10 gap-x-8 px-8 w-full">
                MElo caramelo
              </CardBody>
              <CardFooter className="flex justify-between">
                <Button
                  className="px-8 font-semibold text-medium"
                  color="primary"
                  onPress={() => setSelected('edit')}
                >
                  Anterior paso
                </Button>
                <Button
                  className="px-8 font-semibold text-medium"
                  color="primary"
                  onPress={() => setSelected('confirm')}
                >
                  Siguiente paso
                </Button>
              </CardFooter>
            </Card>
          </Tab>
        </Tabs>
      </Form>
    </div>
  )
}

export default CreatePuzzle
