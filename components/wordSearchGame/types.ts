export interface Question {
  label: string
  answer: string
}

export type Coords = Array<[number, number]>

export interface WordSearchGameProps {
  grid: string[][]
  questions: Question[]
  gameId: string
}
