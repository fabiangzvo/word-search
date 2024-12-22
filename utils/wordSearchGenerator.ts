export type WordPositions = {
  [word: string]: { start: [number, number]; end: [number, number] };
};

export function generateWordSearch(
  words: string[],
  gridSize: number
): { grid: string[][]; wordPositions: WordPositions } {
  const grid: string[][] = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(""));
  const wordPositions: WordPositions = {};

  // Helper function to check if a word fits in the grid
  const wordFits = (
    word: string,
    row: number,
    col: number,
    dRow: number,
    dCol: number
  ): boolean => {
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dRow;
      const newCol = col + i * dCol;
      if (
        newRow < 0 ||
        newRow >= gridSize ||
        newCol < 0 ||
        newCol >= gridSize
      ) {
        return false;
      }
      if (grid[newRow][newCol] !== "" && grid[newRow][newCol] !== word[i]) {
        return false;
      }
    }
    return true;
  };

  // Place words in the grid
  for (const word of words) {
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      const direction = Math.floor(Math.random() * 8);
      const dRow = [-1, -1, -1, 0, 1, 1, 1, 0][direction];
      const dCol = [-1, 0, 1, 1, 1, 0, -1, -1][direction];

      if (wordFits(word, row, col, dRow, dCol)) {
        for (let i = 0; i < word.length; i++) {
          grid[row + i * dRow][col + i * dCol] = word[i];
        }
        wordPositions[word] = {
          start: [row, col],
          end: [row + (word.length - 1) * dRow, col + (word.length - 1) * dCol],
        };
        placed = true;
      }
    }
  }

  // Fill empty cells with random letters
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === "") {
        grid[i][j] = String.fromCharCode(
          65 + Math.floor(Math.random() * 26)
        ).toUpperCase();
      }
    }
  }

  return { grid, wordPositions };
}
