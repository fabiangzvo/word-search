export interface Question {
  label: string
  answer: string
}

export interface WordListProps {
  questions: Question[]
  foundWords: string[]
  mode: 'words' | 'questions'
}
