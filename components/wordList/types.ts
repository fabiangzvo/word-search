export interface Question {
  label: string
  answer: string
}

export type Mode = 'words' | 'questions'

export interface WordListProps {
  questions: Question[]
  foundWords: string[]
  mode: Mode
}

export interface WordItemProps extends Question {
  isFound: boolean
  mode: Mode
}
