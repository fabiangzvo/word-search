import { type JSX } from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'

import { type QuestionFormProps } from './types'

export function QuestionForm(props: QuestionFormProps): JSX.Element {
  const { register, answerError, questionError, fieldIndex, handleSave } = props

  return (
    <div className="flex flex-col gap-4">
      <Input
        errorMessage={questionError}
        isInvalid={!!questionError}
        label="Pregunta"
        labelPlacement="outside"
        placeholder="Escribe tu pregunta"
        variant="bordered"
        {...register(`questions.${fieldIndex}.label`)}
      />
      <Input
        className="max-md:col-span-2"
        errorMessage={answerError}
        isInvalid={!!answerError}
        label="Repuesta"
        labelPlacement="outside"
        placeholder="Escribe la respuesta"
        variant="bordered"
        {...register(`questions.${fieldIndex}.answer`)}
      />
      <div className="w-full flex justify-end mt-4">
        <Button color="primary" variant="solid" onPress={handleSave}>
          Guardar
        </Button>
      </div>
    </div>
  )
}
