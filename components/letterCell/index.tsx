import { JSX, useMemo } from "react";
import clsx from "clsx";

interface LetterCellProps {
  letter: string;
  isSelected: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
}

export default function LetterCell(props: LetterCellProps): JSX.Element {
  const { letter, isSelected, onSelect, onMouseEnter } = props;

  const selectedClass = useMemo(
    () =>
      isSelected
        ? "bg-primary-600 text-white shadow-lg border-primary-700 dark:border-primary-500"
        : "bg-primary-300 dark:bg-primary-900 text-primary-900 dark:text-primary-100 haver:bg-primary-400 dark:hover:bg-primay-800 border-primary-400 dark:border-primary-700",
    [isSelected]
  );

  return (
    <button
      className={clsx(
        `w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl font-bold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 border-2`,
        selectedClass
      )}
      onMouseDown={onSelect}
      onMouseEnter={onMouseEnter}
    >
      {letter}
    </button>
  );
}
