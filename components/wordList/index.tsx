import { type JSX, useMemo } from 'react'
import { WholeWord, Check } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { type WordListProps } from './types'

export default function WordList(props: WordListProps): JSX.Element {
  const { questions, foundWords, mode } = props

  const title = useMemo(
    () => (mode === 'words' ? 'Palabras:' : 'Preguntas:'),
    [mode]
  )

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 mt-10">{title}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {questions.map((question) => (
          <li key={question.answer} className="mb-2">
            {mode === 'words' ? (
              <span
                className={twMerge(
                  'text-lg font-bold p-2 rounded flex text-default-600',
                  foundWords.includes(question.answer) &&
                    'line-through decoration-[3px] decoration-default-300'
                )}
              >
                {foundWords.includes(question.answer) ? (
                  <Check className="w-6 h-6 mr-2" strokeWidth={4} />
                ) : (
                  <WholeWord
                    className="w-6 h-6 mr-2 text-default-600"
                    strokeWidth={2}
                  />
                )}
                {question.answer}
              </span>
            ) : (
              <div>
                <p className="text-lg font-medium mb-1">{question.label}</p>
                {foundWords.includes(question.answer) ? (
                  <span className="text-lg font-bold text-default-600 flex items-center">
                    <Check className="w-6 h-6 mr-2" strokeWidth={4} />
                    {question.answer}
                  </span>
                ) : (
                  <div className="flex text-lg font-bold">
                    <WholeWord
                      className="w-6 h-6 mr-2 text-default-600"
                      strokeWidth={2}
                    />
                    {Array(question.answer.length).fill('_ ')}
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
