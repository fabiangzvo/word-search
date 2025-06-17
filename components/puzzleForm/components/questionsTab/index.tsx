import { type JSX } from 'react'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Button } from '@heroui/button'
import { Tooltip } from '@heroui/tooltip'
import { Plus } from 'lucide-react'

import { QuestionItem } from '../questionItem'
import { CategorySection } from '../categorySection'
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
    checkQuestions,
    categories,
    updateCategory,
  } = props

  return (
    <Card className="w-full bg-transparent" shadow="none">
      <CardBody className="grid grid-cols-1 gap-y-4 w-full">
        <CategorySection
          categories={categories}
          updateCategory={updateCategory}
        />
        <div className="flex justify-between items-center mb-4 gap-2">
          <span className="font-bold text-xl">Preguntas</span>
          <Tooltip content="Agregar pregunta">
            <Button
              isIconOnly
              color="primary"
              size="sm"
              variant="solid"
              onPress={handleAdd}
            >
              <Plus />
            </Button>
          </Tooltip>
        </div>
        {questions.map((field, index) => (
          <QuestionItem
            key={index}
            answer={field.answer}
            answerError={errors.questions?.[index]?.answer?.message}
            checkQuestions={checkQuestions}
            handleRemove={handleRemove}
            index={index}
            question={field.label}
            questionError={errors.questions?.[index]?.label?.message}
            register={register}
          />
        ))}
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
