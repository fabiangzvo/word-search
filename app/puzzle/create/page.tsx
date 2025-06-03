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
import { Rocket, Sparkles } from 'lucide-react'
import { Alert } from '@heroui/alert'
import { Listbox, ListboxItem } from '@heroui/listbox'

import { CreatePuzzleSchema, type FormCreatePuzzle } from '@lib/schemas/puzzle'
import { createPuzzle } from '@lib/actions/puzzle'
import { INotification } from '@/types/notification'
import Stepper from '@components/stepper'
import { GenerateQuestions } from '@lib/gemini'
import QuestionCard from '@components/puzzleForm/components/questionCard'
import { DifficultEnum } from '@/types/puzzle'
import Avatar from '@components/avatar'

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
    watch,
  } = useForm<FormCreatePuzzle>({
    resolver: zodResolver(CreatePuzzleSchema),
    defaultValues: {
      title: '',
      topics: [],
      questions: [],
    },
  })

  const watchQuestion = watch('questions')
  const puzzleData = watch()
  const { append, remove, replace } = useFieldArray({
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
    replace(
      response.questions.map(({ label, answer }) => ({
        question: label,
        answer,
      }))
    )

    setSelected('edit')
  }, [trigger, replace])

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Crear&nbsp;
        <span className="bg-gradient-to-r from-primary-500 via-primary-300 to-primary-600 bg-clip-text text-transparent dark:to-purple-600 dark:via-rose-500">
          sopa de letras
        </span>
      </h2>
      <Stepper
        currentStep={TabItems.findIndex((item) => selected === item.key)}
        steps={TabItems}
      />
      <Form
        className="w-full"
        validationBehavior="native"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Tabs classNames={{ tabList: 'hidden' }} selectedKey={selected}>
          <Tab key="main" className="w-full">
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
                  onPress={onCreateQuestions}
                >
                  Siguiente
                </Button>
              </CardFooter>
            </Card>
          </Tab>
          <Tab key="edit" className="w-full">
            <Card className="w-full bg-transparent" shadow="none">
              <CardBody className="grid grid-cols-1 gap-y-4 w-full">
                <div className="flex justify-end mb-4">
                  <Button
                    className="mt-4"
                    color="primary"
                    onPress={() => append({ question: '', answer: '' })}
                  >
                    Agregar pregunta
                  </Button>
                </div>
                {watchQuestion.map((field, index) => (
                  <QuestionCard
                    key={index}
                    answer={watchQuestion[index].answer}
                    answerError={errors.questions?.[index]?.answer?.message}
                    handleRemove={remove}
                    index={index}
                    question={watchQuestion[index].question}
                    questionError={errors.questions?.[index]?.question?.message}
                    register={register}
                  />
                ))}
              </CardBody>
              <CardFooter className="flex justify-between gap-4">
                <Button
                  className="px-8 font-semibold text-medium"
                  color="primary"
                  onPress={() => setSelected('main')}
                >
                  Atrás
                </Button>
                <Button
                  className="px-8 font-semibold text-medium"
                  color="primary"
                  onPress={() => setSelected('confirm')}
                >
                  Siguiente
                </Button>
              </CardFooter>
            </Card>
          </Tab>
          <Tab key="confirm" className="w-full">
            <Card className="w-full bg-transparent" shadow="none">
              <CardBody className="grid grid-cols-2 gap-y-10 gap-x-8 px-8 w-full">
                <Alert
                  hideIconWrapper
                  classNames={{
                    base: 'col-span-2 dark:bg-default-500/10 bg-default-100',
                    title: 'font-bold',
                    description: 'text-foreground-500',
                  }}
                  color="primary"
                  description="Tu sopa de letras será pública y otros usuarios podrán jugarlo. Podrás editarlo o eliminarlo en cualquier momento desde tu perfil."
                  icon={<Rocket />}
                  title="¡Todo listo para crear!"
                  variant="flat"
                />
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Información del Puzzle
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground-500">Título:</span>
                        <span>{puzzleData.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-500">Dificultad:</span>
                        <span>
                          {
                            DifficultEnum[
                              puzzleData.difficult as keyof typeof DifficultEnum
                            ]
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-500">Tamaño:</span>
                        <span className="text-white">
                          {puzzleData.numberOfRows}x{puzzleData.numberOfRows}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-500">Preguntas:</span>
                        <span className="text-white">
                          {puzzleData.questions.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Descripción
                    </h3>
                    <p className="text-gray-300 text-sm bg-gray-800/50 p-3 rounded">
                      {puzzleData.description}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Preguntas y respuestas
                  </h3>
                  <Listbox
                    disallowEmptySelection
                    aria-label="questions"
                    className="pointer-events-none"
                    selectionMode="multiple"
                  >
                    {puzzleData.questions.map((question, index) => (
                      <ListboxItem
                        key={question.answer}
                        className="mb-2 border-b rounded-none"
                        classNames={{
                          base: 'px-4',
                          title: 'flex flex-wrap h-auto',
                          selectedIcon: 'hidden',
                        }}
                        description={
                          <span className="text-lg font-bold text-default-600 flex">
                            {question.answer}
                          </span>
                        }
                        startContent={
                          <Avatar
                            classNames={{
                              name: 'text-xs',
                              base: 'bg-default-500 h-9 w-10',
                            }}
                            name={`#${index + 1}`}
                          />
                        }
                        title={question.question}
                      />
                    ))}
                  </Listbox>
                </div>
              </CardBody>
              <CardFooter className="flex justify-between gap-4">
                <Button
                  className="px-8 font-semibold text-medium"
                  color="primary"
                  onPress={() => setSelected('edit')}
                >
                  Atrás
                </Button>
                <Button
                  className="px-8 font-semibold text-medium"
                  color="primary"
                  onPress={() => setSelected('confirm')}
                >
                  Siguiente
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
