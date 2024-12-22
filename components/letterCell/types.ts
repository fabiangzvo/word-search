export interface LetterCellProps {
  letter: string;
  isSelected: boolean;
  isFound: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
}
