export interface Question {
  label: string
  answer: string
}

export type Mode = 'words' | 'questions'

export interface WordListProps {
  questions: Question[]
  foundWords: string[]
}

export interface WordItemProps extends Question {
  isFound: boolean
  mode: Mode
}
