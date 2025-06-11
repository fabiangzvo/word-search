import { useMemo, type JSX } from 'react'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Button } from '@heroui/button'

import { QuestionItem } from '../questionItem'
import { type QuestionsTabProps } from './types'

export function QuestionsTab(props: QuestionsTabProps): JSX.Element {
  const {
    questions,
    register,
    errors,
    handleAdd,
    handleRemove,
    handleNext,
    handleBack,
  } = props

  const questionList = useMemo(
    () =>
      questions.map((field, index) => (
        <QuestionItem
          key={index}
          answer={field.answer}
          answerError={errors.questions?.[index]?.answer?.message}
          handleRemove={handleRemove}
          index={index}
          question={field.question}
          questionError={errors.questions?.[index]?.question?.message}
          register={register}
        />
      )),
    [questions, register, errors, handleRemove]
  )

  return (
    <Card className="w-full bg-transparent" shadow="none">
      <CardBody className="grid grid-cols-1 gap-y-4 w-full">
        <div className="flex justify-end mb-4">
          <Button className="mt-4" color="primary" onPress={handleAdd}>
            Agregar pregunta
          </Button>
        </div>
        {questionList}
      </CardBody>
      <CardFooter className="flex justify-between gap-4">
        <Button
          className="px-8 font-semibold text-medium"
          color="primary"
          onPress={handleBack}
        >
          Atrás
        </Button>
        <Button
          className="px-8 font-semibold text-medium"
          color="primary"
          onPress={handleNext}
        >
          Siguiente
        </Button>
      </CardFooter>
    </Card>
  )
}
