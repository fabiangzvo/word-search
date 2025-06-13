import { type JSX } from 'react'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Rocket } from 'lucide-react'
import { Alert } from '@heroui/alert'
import { Listbox, ListboxItem } from '@heroui/listbox'
import { Button } from '@heroui/button'

import { ConfirmationTabProps } from './types'

import Avatar from '@components/avatar'

export function ConfirmationTab(props: ConfirmationTabProps): JSX.Element {
  const { title, description, questions, difficult, numberOfRows, handleBack } =
    props

  return (
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
                <span>{title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-500">Dificultad:</span>
                <span>{difficult}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-500">Tamaño:</span>
                <span className="text-white">
                  {numberOfRows}x{numberOfRows}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-500">Preguntas:</span>
                <span className="text-white">{questions.length}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Descripción
            </h3>
            <p className="text-gray-300 text-sm bg-gray-800/50 p-3 rounded">
              {description}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Preguntas y respuestas</h3>
          <Listbox
            disallowEmptySelection
            aria-label="questions"
            classNames={{
              list: 'max-h-[300px] overflow-y-auto overflow-x-hidden pr-2',
            }}
            selectionMode="multiple"
          >
            {questions.map((question, index) => (
              <ListboxItem
                key={index}
                className="mb-2 border-b rounded-none"
                classNames={{
                  base: 'px-4 pointer-events-none',
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
