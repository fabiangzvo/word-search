export interface Question {
  label: string;
  answer: string;
}

export type Coords = [number, number][];

export interface WordSearchGameProps {
  grid: string[][];
  questions: Question[];
  gameId: string;
}
