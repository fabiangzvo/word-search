import { type JSX, useState, useMemo, Fragment } from 'react'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Button } from '@heroui/button'
import { Trash2, PenLine } from 'lucide-react'
import { Chip } from '@heroui/chip'
import { Input } from '@heroui/input'
import type { UseFieldArrayRemove, UseFormRegister } from 'react-hook-form'

import { FormCreatePuzzle } from '@lib/schemas/puzzle'

export interface QuestionCardProps {
  index: number
  handleRemove: UseFieldArrayRemove
  register: UseFormRegister<FormCreatePuzzle>
  questionError?: string
  answerError?: string
  question: string
  answer: string
}

function QuestionCard(props: QuestionCardProps): JSX.Element {
  const {
    index,
    handleRemove,
    register,
    answerError,
    questionError,
    answer,
    question,
  } = props

  const [isEdit, setIsEdit] = useState(false)

  const component = useMemo(() => {
    if (isEdit)
      return (
        <div className="flex flex-col gap-4">
          <Input
            errorMessage={questionError}
            isInvalid={!!questionError}
            label="Pregunta"
            labelPlacement="outside"
            placeholder="Escribe tu pregunta"
            variant="bordered"
            {...register(`questions.${index}.question`)}
          />
          <Input
            className="max-md:col-span-2"
            errorMessage={answerError}
            isInvalid={!!answerError}
            label="Repuesta"
            labelPlacement="outside"
            placeholder="Escribe la respuesta"
            variant="bordered"
            {...register(`questions.${index}.answer`)}
          />
          <div className="w-full flex justify-end mt-4">
            <Button
              color="primary"
              variant="solid"
              onPress={() => setIsEdit((prev) => !prev)}
            >
              Guardar
            </Button>
          </div>
        </div>
      )

    return (
      <Fragment>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-gray-500 text-xs">Pregunta/Pista</span>
            <p>{question || 'Sin pregunta'}</p>
          </div>
          <div>
            <span className="text-gray-500 text-xs">Respuesta</span>
            <p className="text-default-400 font-mono font-bold">
              {answer || 'Sin respuesta'}
            </p>
          </div>
        </div>
      </Fragment>
    )
  }, [isEdit])

  return (
    <Card shadow="sm">
      <CardHeader className="flex justify-between px-4 pb-0">
        <Chip color="primary" variant="flat">
          #{index + 1}
        </Chip>
        <div className="flex gap-3">
          <Button
            isIconOnly
            color="warning"
            size="sm"
            variant="light"
            onPress={() => setIsEdit((prev) => !prev)}
          >
            <PenLine />
          </Button>
          <Button
            isIconOnly
            color="danger"
            size="sm"
            variant="light"
            onPress={() => handleRemove(index)}
          >
            <Trash2 />
          </Button>
        </div>
      </CardHeader>
      <CardBody className="px-4">{component}</CardBody>
    </Card>
  )
}

export default QuestionCard
