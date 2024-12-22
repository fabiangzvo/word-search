import React from "react";

import { LetterCellProps } from "./types";

export default function LetterCell(props: LetterCellProps): JSX.Element {
  const { letter, isSelected, isFound, onSelect, onMouseEnter } = props;
  return (
    <button
      className={`w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl font-bold rounded-lg transition-all duration-200 ease-in-out ${
        isFound
          ? "bg-emerald-500 dark:bg-fuchsia-500 text-white"
          : isSelected
          ? "bg-emerald-600 dark:bg-fuchsia-600 text-white shadow-lg"
          : "bg-emerald-300 dark:bg-fuchsia-900 text-emerald-900 dark:text-fuchsia-100 hover:bg-emerald-400 dark:hover:bg-fuchsia-800"
      } border-2 ${
        isFound
          ? "border-emerald-600 dark:border-fuchsia-400"
          : isSelected
          ? "border-emerald-700 dark:border-fuchsia-500"
          : "border-emerald-400 dark:border-fuchsia-700"
      }`}
      onMouseDown={onSelect}
      onMouseEnter={onMouseEnter}
      onTouchStart={(e) => {
        e.preventDefault();
        onSelect();
      }}
      onTouchMove={(e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target && target !== e.currentTarget) {
          const event = new MouseEvent("mouseenter", {
            view: window,
            bubbles: true,
            cancelable: true,
          });
          target.dispatchEvent(event);
        }
      }}
    >
      {letter}
    </button>
  );
}
