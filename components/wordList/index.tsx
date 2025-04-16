import { type JSX, useMemo, useState, useCallback } from 'react'
import { Listbox, ListboxItem } from '@heroui/listbox'
import { Shuffle } from "lucide-react";
import { Button } from '@heroui/button'

import { type WordListProps, type Mode } from './types'

export default function WordList(props: WordListProps): JSX.Element {
  const { questions, foundWords } = props

  const [mode, setMode] = useState<Mode>("words");

  const handleChangeMode = useCallback(() => setMode(currentMode => currentMode === 'words' ? 'questions' : 'words'), [])

  const { title, switchButton, showWords } = useMemo(
    () => {
      const showWords = mode === 'words'

      return {
        showWords,
        title: showWords ? 'Palabras' : 'Pistas',
        switchButton: showWords ? 'Ver pistas' : 'Ver palabras'
      }
    },
    [mode]
  )

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
    <div className="bg-default-400 bg-opacity-10 rounded-xl h-min w-96 p-4 max-md:w-full">
      <div className='flex justify-between items-center mb-4'>
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button
          variant='light'
          startContent={<Shuffle size={20} />}
          onPress={handleChangeMode}
        >
          {switchButton}
        </Button>
      </div>
      <ul className="grid grid-cols-1 gap-4">
        <Listbox
          disallowEmptySelection
          aria-label="Multiple selection example"
          selectedKeys={foundWords}
          selectionMode="multiple"
          variant="flat"
          className="pointer-events-none"
        >
          {list.map((question) => (
            <ListboxItem
              key={question.answer}
              className="mb-2 bg-primary-200 bg-opacity-95 dark:bg-opacity-10"
              classNames={{
                selectedIcon:
                  'text-primary-500 h-5 w-5 [&>svg>polyline]:stroke-[3]',
                base: 'px-4',
              }}
              title={question.label}
              description={
                <span className="text-lg font-bold text-default-600 flex">
                  {foundWords.includes(question.answer) || showWords
                    ? question.answer
                    : Array(question.answer.length).fill('_ ')}
                </span>}
            />
          ))}
        </Listbox>
      </ul>
    </div>
  )
}
