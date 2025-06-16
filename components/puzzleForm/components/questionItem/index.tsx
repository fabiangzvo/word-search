import { type JSX, useState, useMemo, Fragment } from 'react'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Button } from '@heroui/button'
import { Trash2, PenLine } from 'lucide-react'
import { Chip } from '@heroui/chip'
import { Tooltip } from '@heroui/tooltip'

import { QuestionForm } from '../questionForm/index'
import { type QuestionItemProps } from './types'

export function QuestionItem(props: QuestionItemProps): JSX.Element {
  const {
    index,
    handleRemove,
    register,
    answerError,
    questionError,
    answer,
    question,
    checkQuestions,
  } = props

  const [isEdit, setIsEdit] = useState(false)

  const component = useMemo(() => {
    if (isEdit)
      return (
        <QuestionForm
          answerError={answerError}
          fieldIndex={index}
          handleSave={async () => {
            const isFilled = await checkQuestions()

            if (!isFilled) return

            setIsEdit((prev) => !prev)
          }}
          questionError={questionError}
          register={register}
        />
      )

    return (
      <Fragment>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-gray-500 text-sm">Pregunta/Pista</span>
            <p>{question || 'Sin pregunta'}</p>
            <p className="text-small text-danger-500 font-normal">
              {questionError}
            </p>
          </div>
          <div>
            <span className="text-gray-500 text-sm">Respuesta</span>
            <p className="text-default-400 font-mono font-bold text-base">
              {answer || 'Sin respuesta'}
            </p>
            <p className="text-small text-danger-500 font-normal">
              {answerError}
            </p>
          </div>
        </div>
      </Fragment>
    )
  }, [isEdit, index, register, answerError, questionError, checkQuestions])

  return (
    <Card shadow="sm">
      <CardHeader className="flex justify-between px-4 pb-0">
        <Chip color="primary" variant="flat">
          #{index + 1}
        </Chip>
        <div className="flex gap-3">
          <Tooltip content="Editar pregunta">
            <Button
              isIconOnly
              color="warning"
              size="sm"
              variant="light"
              onPress={() => setIsEdit((prev) => !prev)}
            >
              <PenLine />
            </Button>
          </Tooltip>
          <Tooltip content="Eliminar pregunta">
            <Button
              isIconOnly
              color="danger"
              size="sm"
              variant="light"
              onPress={() => handleRemove(index)}
            >
              <Trash2 />
            </Button>
          </Tooltip>
        </div>
      </CardHeader>
      <CardBody className="px-4 pt-2">{component}</CardBody>
    </Card>
  )
}
