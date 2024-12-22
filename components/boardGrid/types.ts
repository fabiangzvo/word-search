export interface WordSearchGridProps {
  grid: string[][];
  selectedCells: [number, number][];
  foundCells: [number, number][];
  onCellSelect: (row: number, col: number) => void;
  onSelectionEnd: () => void;
  isSelecting: boolean;
  onTouchStart: () => void;
  onTouchEnd: () => void;
}
