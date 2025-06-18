import { Difficult } from '@/types/puzzle'

/**
 * High-Performance Word Search Generator with Difficulty Levels
 * Optimized for speed without caching strategies for simpler memory management
 */

export type WordPositions = {
  [word: string]: { start: [number, number]; end: [number, number] }
}

/**
 * Configuration constants for the word search generator
 */
const CONFIG = {
  MAX_PLACEMENT_ATTEMPTS: 500, // Reduced for better performance
  REVERSE_WORD_PROBABILITY: 0.3,
  MIN_GRID_SIZE: 5,
  MAX_GRID_SIZE: 50,
  ASCII_A: 65,
  ALPHABET_SIZE: 26,
  MAX_POSITION_CACHE: 1000, // For potential future optimizations
} as const

/**
 * Pre-computed direction vectors for word placement
 */
const DIRECTIONS = {
  HORIZONTAL_RIGHT: [0, 1] as const,
  VERTICAL_DOWN: [1, 0] as const,
  DIAGONAL_DOWN_RIGHT: [1, 1] as const,
  DIAGONAL_UP_RIGHT: [-1, 1] as const,
  DIAGONAL_DOWN_LEFT: [1, -1] as const,
  DIAGONAL_UP_LEFT: [-1, -1] as const,
  HORIZONTAL_LEFT: [0, -1] as const,
  VERTICAL_UP: [-1, 0] as const,
} as const

/**
 * Performance optimized without caching for simpler memory management
 */

/**
 * Validates input parameters (optimized version)
 */
function validateInputs(
  words: string[],
  gridSize: number,
  difficulty: Difficult
): void {
  if (!Array.isArray(words) || words.length === 0) {
    throw new Error('Words must be a non-empty array')
  }

  if (
    !Number.isInteger(gridSize) ||
    gridSize < CONFIG.MIN_GRID_SIZE ||
    gridSize > CONFIG.MAX_GRID_SIZE
  ) {
    throw new Error(
      `Grid size must be between ${CONFIG.MIN_GRID_SIZE} and ${CONFIG.MAX_GRID_SIZE}`
    )
  }

  if (
    difficulty !== 'easy' &&
    difficulty !== 'medium' &&
    difficulty !== 'hard'
  ) {
    throw new Error('Difficulty must be facil, medio, or dificil')
  }

  // Quick validation for critical errors only
  const maxWordLength = Math.max(...words.map((w) => w.length))
  if (maxWordLength > gridSize) {
    throw new Error(
      `Longest word (${maxWordLength} chars) exceeds grid size (${gridSize})`
    )
  }
}

/**
 * Gets allowed directions (no caching for simpler memory management)
 */
function getDirections(
  level: Difficult
): ReadonlyArray<readonly [number, number]> {
  switch (level) {
    case 'easy':
      return [DIRECTIONS.HORIZONTAL_RIGHT, DIRECTIONS.VERTICAL_DOWN]
    case 'medium':
      return [
        DIRECTIONS.HORIZONTAL_RIGHT,
        DIRECTIONS.VERTICAL_DOWN,
        DIRECTIONS.DIAGONAL_DOWN_RIGHT,
        DIRECTIONS.DIAGONAL_UP_RIGHT,
        DIRECTIONS.DIAGONAL_DOWN_LEFT,
        DIRECTIONS.DIAGONAL_UP_LEFT,
      ]
    case 'hard':
      return Object.values(DIRECTIONS)
    default:
      throw new Error(`Unknown difficulty level: ${level}`)
  }
}

/**
 * Creates grid using typed arrays for better performance
 */
function createEmptyGrid(size: number): string[][] {
  const grid = new Array(size)
  for (let i = 0; i < size; i++) {
    grid[i] = new Array(size)
    grid[i].fill('')
  }
  return grid
}

/**
 * Optimized word placement check using early termination
 */
function canPlaceWord(
  grid: string[][],
  word: string,
  startRow: number,
  startCol: number,
  deltaRow: number,
  deltaCol: number,
  gridSize: number
): boolean {
  const wordLength = word.length

  // Quick bounds check for the entire word
  const endRow = startRow + (wordLength - 1) * deltaRow
  const endCol = startCol + (wordLength - 1) * deltaCol

  if (endRow < 0 || endRow >= gridSize || endCol < 0 || endCol >= gridSize) {
    return false
  }

  // Check each position with early termination
  let currentRow = startRow
  let currentCol = startCol

  for (let i = 0; i < wordLength; i++) {
    const existingLetter = grid[currentRow][currentCol]
    if (existingLetter !== '' && existingLetter !== word[i]) {
      return false
    }
    currentRow += deltaRow
    currentCol += deltaCol
  }

  return true
}

/**
 * Optimized word placement in grid
 */
function placeWordInGrid(
  grid: string[][],
  word: string,
  startRow: number,
  startCol: number,
  deltaRow: number,
  deltaCol: number
): void {
  const wordLength = word.length
  let currentRow = startRow
  let currentCol = startCol

  for (let i = 0; i < wordLength; i++) {
    grid[currentRow][currentCol] = word[i]
    currentRow += deltaRow
    currentCol += deltaCol
  }
}

/**
 * Smart word placement using position shuffling for better distribution
 */
function attemptWordPlacement(
  grid: string[][],
  originalWord: string,
  allowedDirections: ReadonlyArray<readonly [number, number]>,
  isDifficult: boolean,
  gridSize: number
): { start: [number, number]; end: [number, number] } | null {
  const wordLength = originalWord.length
  const directionsCount = allowedDirections.length

  // Pre-compute word variants
  const shouldReverse =
    isDifficult && Math.random() < CONFIG.REVERSE_WORD_PROBABILITY
  const wordToPlace = shouldReverse
    ? originalWord.split('').reverse().join('')
    : originalWord

  // Create shuffled position attempts for better distribution
  const maxAttempts = Math.min(
    CONFIG.MAX_PLACEMENT_ATTEMPTS,
    gridSize * gridSize * directionsCount
  )
  const attemptStep = Math.max(1, Math.floor(maxAttempts / 100)) // Sample positions

  for (let attempt = 0; attempt < maxAttempts; attempt += attemptStep) {
    const startRow = Math.floor(Math.random() * gridSize)
    const startCol = Math.floor(Math.random() * gridSize)
    const directionIndex = Math.floor(Math.random() * directionsCount)
    const [deltaRow, deltaCol] = allowedDirections[directionIndex]

    if (
      canPlaceWord(
        grid,
        wordToPlace,
        startRow,
        startCol,
        deltaRow,
        deltaCol,
        gridSize
      )
    ) {
      placeWordInGrid(grid, wordToPlace, startRow, startCol, deltaRow, deltaCol)

      const endRow = startRow + (wordLength - 1) * deltaRow
      const endCol = startCol + (wordLength - 1) * deltaCol

      return {
        start: [startRow, startCol],
        end: [endRow, endCol],
      }
    }
  }

  return null
}

/**
 * Optimized empty cell filling with on-demand random generation
 */
function fillEmptyCells(grid: string[][], gridSize: number): void {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col] === '') {
        grid[row][col] = String.fromCharCode(
          CONFIG.ASCII_A + Math.floor(Math.random() * CONFIG.ALPHABET_SIZE)
        )
      }
    }
  }
}

/**
 * Optimized word preprocessing with Set for O(1) deduplication
 */
function preprocessWords(words: string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []

  for (let i = 0; i < words.length; i++) {
    const word = words[i].trim().toUpperCase()
    if (word.length > 0 && !seen.has(word)) {
      seen.add(word)
      result.push(word)
    }
  }

  return result
}

/**
 * Smart word sorting for better placement success rate
 */
function optimizeWordOrder(words: string[]): string[] {
  // Sort by length descending - longer words are harder to place
  return [...words].sort((a, b) => b.length - a.length)
}

/**
 * Main function to generate a word search puzzle (performance optimized)
 * @param words - Array of words to place in the puzzle
 * @param gridSize - Size of the square grid (gridSize x gridSize)
 * @param difficulty - Difficulty level: 'facil', 'medio', or 'dificil'
 * @returns Object containing the grid and word positions
 */
export function generateWordSearch(
  words: string[],
  gridSize: number,
  difficulty: Difficult = 'easy'
): { grid: string[][]; wordPositions: WordPositions } {
  // Fast validation
  validateInputs(words, gridSize, difficulty)

  // Optimize word processing
  const processedWords = preprocessWords(words)
  if (processedWords.length === 0) {
    throw new Error('No valid words found')
  }

  // Sort words for better placement success
  const optimizedWords = optimizeWordOrder(processedWords)

  // Pre-compute values
  const grid = createEmptyGrid(gridSize)
  const wordPositions: WordPositions = {}
  const allowedDirections = getDirections(difficulty)
  const isDifficult = difficulty === 'hard'

  // Performance tracking
  const startTime = performance.now()
  let placedCount = 0

  // Place words with optimized algorithm
  for (let i = 0; i < optimizedWords.length; i++) {
    const word = optimizedWords[i]
    const placement = attemptWordPlacement(
      grid,
      word,
      allowedDirections,
      isDifficult,
      gridSize
    )

    if (placement) {
      wordPositions[word] = placement
      placedCount++
    }
  }

  // Fill empty cells efficiently
  fillEmptyCells(grid, gridSize)

  return { grid, wordPositions }
}

/**
 * Gets descriptive information about a difficulty level
 */
export function getDifficultyInfo(difficulty: Difficult): string {
  switch (difficulty) {
    case 'easy':
      return 'Palabras solo en horizontal (→) y vertical (↓)'
    case 'medium':
      return 'Palabras en horizontal, vertical y todas las diagonales'
    case 'hard':
      return 'Todas las direcciones incluyendo palabras al revés'
    default:
      return 'Nivel desconocido'
  }
}

/**
 * Optimized utility function for difficulty statistics
 */
export function getDifficultyStats(difficulty: Difficult): {
  directionsCount: number
  allowsReverse: boolean
  complexity: 'Low' | 'Medium' | 'High'
} {
  const directions = getDirections(difficulty)

  return {
    directionsCount: directions.length,
    allowsReverse: difficulty === 'hard',
    complexity:
      difficulty === 'easy'
        ? 'Low'
        : difficulty === 'medium'
          ? 'Medium'
          : 'High',
  }
}
