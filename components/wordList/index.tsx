import { type JSX, useMemo, useState, useCallback } from 'react'
import { Listbox, ListboxItem } from '@heroui/listbox'
import { Shuffle } from 'lucide-react'
import { Button } from '@heroui/button'
import { Card, CardHeader, CardBody } from "@heroui/card";

import { type WordListProps, type Mode } from './types'

export default function WordList(props: WordListProps): JSX.Element {
  const { questions, foundWords } = props

  const [mode, setMode] = useState<Mode>('words')

  const handleChangeMode = useCallback(
    () =>
      setMode((currentMode) =>
        currentMode === 'words' ? 'questions' : 'words'
      ),
    []
  )

  const { title, switchButton, showWords } = useMemo(() => {
    const showWords = mode === 'words'

    return {
      showWords,
      title: showWords ? 'Palabra' : 'Pista',
      switchButton: showWords ? 'Ver pistas' : 'Ver palabras',
    }
  }, [mode])

  const list = useMemo(
    () =>
      questions.map(({ answer, label }) => ({
        answer,
        label: showWords ? '' : label,
        isFound: foundWords.includes(answer),
      })),
    [questions, foundWords, showWords]
  )

  return (
    <Card className="h-min w-96 max-md:w-full">
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <Button
          color="primary"
          startContent={<Shuffle size={20} />}
          variant="flat"
          onPress={handleChangeMode}
        >
          {switchButton}
        </Button>
      </CardHeader>
      <CardBody className="grid grid-cols-1 gap-4">
        <Listbox
          disallowEmptySelection
          aria-label="Multiple selection example"
          className="pointer-events-none"
          selectedKeys={foundWords}
          selectionMode="multiple"
          variant="flat"
        >
          {list
            .filter((item) => !item.isFound)
            .slice(0, 1)
            .map((question) => (
              <ListboxItem
                key={question.answer}
                className="mb-2 bg-default-200 bg-opacity-40 dark:bg-opacity-5"
                classNames={{
                  selectedIcon:
                    'text-primary-500 h-5 w-5 [&>svg>polyline]:stroke-[3]',
                  base: 'px-4',
                }}
                description={
                  <span className="text-lg font-bold text-default-600 flex">
                    {foundWords.includes(question.answer) || showWords
                      ? question.answer
                      : Array(question.answer.length).fill('_ ')}
                  </span>
                }
                title={question.label}
              />
            ))}
        </Listbox>
      </CardBody>
    </Card>
  )
}
