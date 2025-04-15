import { type JSX, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { Listbox, ListboxItem } from '@heroui/listbox'

import { type WordListProps } from './types'

export default function WordList(props: WordListProps): JSX.Element {
  const { questions, foundWords, mode } = props

  const title = useMemo(
    () => (mode === 'words' ? 'Palabras' : 'Pistas'),
    [mode]
  )

  const list = useMemo(
    () =>
      questions.map((question) => ({
        ...question,
        isFound: foundWords.includes(question.answer),
      })),
    [questions, foundWords]
  )

  return (
    <div className="bg-default-400 bg-opacity-10 rounded-xl h-min w-96 p-4 max-md:w-full">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
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
            >
              {mode === 'words' ? (
                <span
                  className={twMerge(
                    'text-lg font-bold p-2 rounded flex text-default-600'
                  )}
                >
                  {question.answer}
                </span>
              ) : (
                <div>
                  <p className="text-lg font-medium mb-1">{question.label}</p>
                  {foundWords.includes(question.answer) ? (
                    <span className="text-lg font-bold text-default-600 flex items-center">
                      {question.answer}
                    </span>
                  ) : (
                    <div className="flex text-lg font-bold">
                      {Array(question.answer.length).fill('_ ')}
                    </div>
                  )}
                </div>
              )}
            </ListboxItem>
          ))}
        </Listbox>
      </ul>
    </div>
  )
}
