import React from "react";
import LetterCell from "../letterCell";

interface WordSearchGridProps {
  grid: string[][];
  selectedCells: [number, number][];
  onCellSelect: (row: number, col: number) => void;
  onSelectionEnd: () => void;
  isSelecting: boolean;
}

export const WordSearchGrid: React.FC<WordSearchGridProps> = ({
  grid,
  selectedCells,
  onCellSelect,
  onSelectionEnd,
  isSelecting,
}) => {
  return (
    <div
      className="grid gap-1 sm:gap-2 p-4 bg-emerald-100 dark:bg-black rounded-xl shadow-lg"
      style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}
      onMouseLeave={onSelectionEnd}
      onMouseUp={onSelectionEnd}
    >
      {grid.map((row, rowIndex) =>
        row.map((letter, colIndex) => (
          <LetterCell
            key={`${rowIndex}-${colIndex}`}
            letter={letter}
            isSelected={selectedCells.some(
              ([r, c]) => r === rowIndex && c === colIndex
            )}
            onSelect={() => onCellSelect(rowIndex, colIndex)}
            onMouseEnter={() => isSelecting && onCellSelect(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};
export default WordSearchGrid;