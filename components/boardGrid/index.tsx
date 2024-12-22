import React, { useCallback, JSX } from "react";

import LetterCell from "../letterCell";
import { WordSearchGridProps } from "./types";

export default function WordSearchGrid(
  props: WordSearchGridProps
): JSX.Element {
  const {
    grid,
    selectedCells,
    foundCells,
    onCellSelect,
    onSelectionEnd,
    isSelecting,
    onTouchStart,
    onTouchEnd,
  } = props;

  const handleTouchStart = useCallback(() => {
    onTouchStart();
  }, [onTouchStart]);

  const handleTouchEnd = useCallback(() => {
    onTouchEnd();
    onSelectionEnd();
  }, [onTouchEnd, onSelectionEnd]);

  return (
    <div
      className="grid gap-1 sm:gap-2 p-4 bg-emerald-100 dark:bg-black rounded-xl shadow-lg"
      style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}
      onMouseLeave={onSelectionEnd}
      onMouseUp={onSelectionEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {grid.map((row, rowIndex) =>
        row.map((letter, colIndex) => (
          <LetterCell
            key={`${rowIndex}-${colIndex}`}
            letter={letter}
            isSelected={selectedCells.some(
              ([r, c]) => r === rowIndex && c === colIndex
            )}
            isFound={foundCells.some(
              ([r, c]) => r === rowIndex && c === colIndex
            )}
            onSelect={() => onCellSelect(rowIndex, colIndex)}
            onMouseEnter={() => isSelecting && onCellSelect(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
}
