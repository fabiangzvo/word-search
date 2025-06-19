'use client'

import { type JSX, useState, useCallback } from 'react'
import { Form } from '@heroui/form'
import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Tab, Tabs } from '@heroui/tabs'
import { motion } from 'framer-motion'
import _isEqual from 'lodash/isEqual'

import {
  CreatePuzzleSchema,
  type FormCreatePuzzleType,
} from '@lib/schemas/puzzle'
import { createPuzzle } from '@lib/actions/puzzle'
import { INotification } from '@/types/notification'
import Stepper from '@components/stepper'
import { GenerateQuestions } from '@lib/gemini'
import { generateWordSearch } from '@utils/wordSearchGenerator'
import { IPuzzleClient } from '@/types/puzzle'

import { QuestionsTab } from './components/questionsTab'
import { BasicInfoTab } from './components/basicInfoTab'
import { ConfirmationTab } from './components/confirmationTab'
import { constants } from './constants'
import { PuzzleFormProps } from './types'
import { updatePuzzle } from '@lib/queries/puzzle'

export function PuzzleForm({
  defaultValues,
  puzzleId,
}: PuzzleFormProps): JSX.Element {
  const [selected, setSelected] = useState('main')
  const [isLeft, setIsLeft] = useState(false)

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
  } = useForm<FormCreatePuzzleType>({
    resolver: zodResolver(CreatePuzzleSchema),
    defaultValues,
  })

  const puzzleData = watch()
  const { append, remove, replace } = useFieldArray({
    control,
    name: 'questions',
  })

  const onSubmit: SubmitHandler<FormCreatePuzzleType> = async (data) => {
    let response: IPuzzleClient | null = null
    const notification: INotification = {
      message: 'No se ha podido crear la sopa de letras',
      settings: { type: 'error', position: 'top-right' },
    }

    if (puzzleId) {
      if (_isEqual(defaultValues, data))
        return toast('No hay informacion para actualizar', {
          ...notification.settings,
          type: 'warning',
        })

      response = await updatePuzzle(puzzleId, data)

      notification.message = 'Sopa de letras actualizada!'
    } else {
      response = await createPuzzle(data, session.data?.user?.id ?? '')

      notification.message = 'Sopa de letras creada!'
    }

    if (!response)
      return toast(
        !puzzleId
          ? notification.message
          : 'No se ha podido actualizar la sopa de letras',
        notification.settings
      )

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

    if (
      context !== defaultValues?.prompt ||
      numberOfQuestions !== defaultValues?.numberOfQuestions
    ) {
      const response = await GenerateQuestions(numberOfQuestions, context)

      setValue('description', response.description)
      replace(response.questions)
      setValue('categories', response.categories)
    }

    setIsLeft(false)
    setSelected('edit')
  }, [
    trigger,
    replace,
    defaultValues?.prompt,
    defaultValues?.numberOfQuestions,
  ])

  const checkQuestions = useCallback(
    async () => trigger(['questions']),
    [trigger]
  )

  const generateBoard = useCallback(() => {
    const { grid } = generateWordSearch(
      puzzleData.questions.map((question) => question.answer),
      puzzleData.numberOfRows,
      puzzleData.difficult
    )

    setValue('matrix', grid)
  }, [
    setValue,
    puzzleData.questions,
    puzzleData.numberOfRows,
    puzzleData.difficult,
  ])

  const handleLastStep = useCallback(async () => {
    const isFilled = await checkQuestions()

    if (!isFilled) return

    if (
      !puzzleData?.matrix ||
      puzzleData.matrix?.length <= 0 ||
      defaultValues?.prompt !== puzzleData.prompt ||
      defaultValues?.difficult !== puzzleData.difficult ||
      !_isEqual(defaultValues?.questions, puzzleData.questions)
    )
      generateBoard()

    setSelected('confirm')
    setIsLeft(false)
  }, [
    checkQuestions,
    generateBoard,
    puzzleData.questions,
    puzzleData.numberOfRows,
    puzzleData.difficult,
    puzzleData.matrix,
  ])

  return (
    <div className="flex flex-col items-center w-full">
      <Stepper
        currentStep={constants.tabItems.findIndex(
          (item: { key: string }) => selected === item.key
        )}
        steps={constants.tabItems}
      />
      <Form
        className="w-full"
        validationBehavior="native"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Tabs classNames={{ tabList: 'hidden' }} selectedKey={selected}>
          <Tab
            key="main"
            className="w-full relative"
            title="Información esencial"
          >
            <motion.div
              transition={{ duration: 0.2 }}
              {...constants[isLeft ? 'animationFromLeft' : 'initialAnimation']}
            >
              <BasicInfoTab
                errors={errors}
                register={register}
                onCreateQuestions={onCreateQuestions}
              />
            </motion.div>
          </Tab>
          <Tab key="edit" className="w-full" title="Preguntas">
            <motion.div
              transition={{ duration: 0.2 }}
              {...constants[
                isLeft ? 'animationFromLeft' : 'animationFromRight'
              ]}
            >
              <QuestionsTab
                categories={puzzleData.categories}
                checkQuestions={checkQuestions}
                errors={errors}
                handleAdd={() => append({ label: '', answer: '' })}
                handleBack={() => {
                  setSelected('main')
                  setIsLeft(true)
                }}
                handleNext={handleLastStep}
                handleRemove={remove}
                questions={puzzleData.questions}
                register={register}
                updateCategory={(categories: string[]) =>
                  setValue('categories', categories)
                }
              />
            </motion.div>
          </Tab>
          <Tab key="confirm" className="w-full" title="Confirmación">
            <motion.div
              transition={{ duration: 0.2 }}
              {...constants[
                isLeft ? 'animationFromLeft' : 'animationFromRight'
              ]}
            >
              <ConfirmationTab
                categories={puzzleData.categories}
                description={puzzleData.description}
                difficult={puzzleData.difficult}
                handleBack={() => {
                  setSelected('edit')
                  setIsLeft(true)
                }}
                isUpdate={!!puzzleId}
                matrix={puzzleData.matrix}
                numberOfQuestions={puzzleData.numberOfQuestions}
                numberOfRows={puzzleData.numberOfRows}
                questions={puzzleData.questions}
                regenerateBoard={generateBoard}
                title={puzzleData.title}
              />
            </motion.div>
          </Tab>
        </Tabs>
      </Form>
    </div>
  )
}
