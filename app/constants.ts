import { Cell } from '@/types/boardGrid'

export const NOT_FOUND_PUZZLE: string[][] = [
  ['V', 'R', 'B', 'C', 'C', 'J', 'M', 'K', 'Q', 'O', 'D'],
  ['Y', 'P', 'M', 'I', 'K', 'G', 'G', 'H', 'S', 'N', 'T'],
  ['S', 'H', 'K', '4', '0', '4', 'Z', 'G', 'A', 'E', 'Q'],
  ['Z', 'K', 'H', 'P', 'F', 'H', 'A', 'J', 'L', 'H', 'I'],
  ['T', 'P', 'D', 'O', 'V', 'T', 'V', 'K', 'P', 'Q', 'J'],
  ['J', 'A', 'H', 'L', 'K', 'Q', 'V', 'Y', 'V', 'X', 'P'],
  ['S', 'M', 'I', 'F', 'T', 'X', 'K', 'Z', 'E', 'T', 'A'],
  ['K', 'R', 'E', 'G', 'R', 'E', 'S', 'A', 'R', 'C', 'D'],
  ['D', 'K', 'Y', 'U', 'L', 'X', 'E', 'K', 'G', 'F', 'S'],
  ['H', 'G', 'A', 'Y', 'J', 'W', 'G', 'E', 'V', 'D', 'M'],
  ['M', 'I', 'C', 'H', 'A', 'E', 'R', 'O', 'N', 'T', 'Z'],
]

export const NOT_FOUND_DEFAULT_PUZZLE: Cell[] = [
  [
    [2, 3],
    [2, 4],
    [2, 5],
  ],
]

export const PLAY_PUZZLE: string[][] = [
  ['V', 'R', 'B', 'C', 'C', 'J', 'M', 'K', 'Q', 'O'],
  ['Y', 'P', 'M', 'I', 'K', 'G', 'G', 'H', 'S', 'N'],
  ['S', 'H', 'K', 'F', 'V', 'Q', 'Z', 'G', 'A', 'E'],
  ['Z', 'K', 'H', 'P', 'F', 'H', 'A', 'J', 'L', 'H'],
  ['T', 'J', 'D', 'O', 'V', 'T', 'V', 'K', 'P', 'Q'],
  ['J', 'A', 'U', 'L', 'K', 'Q', 'V', 'Y', 'V', 'X'],
  ['S', 'M', 'I', 'G', 'T', 'X', 'K', 'Z', 'E', 'T'],
  ['K', 'H', 'W', 'G', 'A', 'E', 'S', 'Q', 'Z', 'C'],
  ['D', 'K', 'Y', 'U', 'L', 'R', 'E', 'K', 'G', 'F'],
  ['H', 'G', 'A', 'Y', 'J', 'W', 'G', 'E', 'V', 'D'],
]

export const PLAY_DEFAULT_PUZZLE: Cell[] = []
