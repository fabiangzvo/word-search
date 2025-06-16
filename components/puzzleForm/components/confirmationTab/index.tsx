import { useMemo, type JSX } from 'react'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Rocket } from 'lucide-react'
import { Alert } from '@heroui/alert'
import { Button } from '@heroui/button'

import { CategoryList } from '../categoryList'
import { ConfirmationTabProps } from './types'

import Avatar from '@components/avatar'
import BoardGrid from '@components/game/components/board'

export function ConfirmationTab(props: ConfirmationTabProps): JSX.Element {
  const {
    title,
    description,
    questions,
    difficult,
    numberOfRows,
    handleBack,
    categories,
  } = props

  const questionsList = useMemo(
    () =>
      questions.map((question, index) => (
        <li
          key={index}
          className="flex gap-4 items-center px-4 py-2 box-border bg-content1 outline-none shadow-small rounded-large transition-transform-background"
        >
          <Avatar
            classNames={{
              name: 'text-sm text-primary-600 font-bold',
              base: 'bg-primary/20 h-9 w-9',
            }}
            name={`#${index + 1}`}
          />
          <div>
            <span className="flex">{question.label}</span>
            <span className="font-bold text-default-600 flex">
              {question.answer}
            </span>
          </div>
        </li>
      )),
    [questions]
  )

  return (
    <Card className="w-full bg-transparent" shadow="none">
      <CardBody className="flex flex-col gap-y-10 px-8 w-full">
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
        <div className="space-y-2 grid grid-cols-3 max-md:grid-cols-1 gap-y-2">
          <div className="flex flex-col items-center gap-y-2">
            <span className="text-foreground-500">Título</span>
            <span>{title}</span>
          </div>
          <div className="flex flex-col items-center gap-y-2">
            <span className="text-foreground-500">Dificultad</span>
            <span>{difficult}</span>
          </div>
          <div className="flex flex-col items-center gap-y-2">
            <span className="text-foreground-500">Tamaño</span>
            <span>
              {numberOfRows}x{numberOfRows}
            </span>
          </div>
          <div className="flex flex-col col-span-full items-center gap-y-2">
            <span className="text-foreground-500">Descripción</span>
            <span className="text-center">{description}</span>
          </div>
          <div className="flex flex-col col-span-full items-center gap-y-2">
            <span className="text-foreground-500">Categorias</span>
            <span className="flex gap-2 flex-wrap justify-center">
              <CategoryList categories={categories} />
            </span>
          </div>
        </div>
        <BoardGrid grid={grid} foundCells={[]} className="pointer-events-none" />
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Preguntas y respuestas ({questions.length})
          </h3>
          <ol className="list-none list-inside grid grid-cols-1 gap-4">
            {questionsList}
          </ol>
        </div>
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
          type="submit"
        >
          Crear
        </Button>
      </CardFooter>
    </Card>
  )
}
