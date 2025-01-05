import { JSX } from "react";

import { GameModeSelectorProps } from "./types";

export default function GameModeSelector(
  props: GameModeSelectorProps
): JSX.Element {
  const { mode, onModeChange } = props;
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-emerald-800 dark:text-fuchsia-100">
        Game Mode
      </h2>
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            mode === "words"
              ? "bg-emerald-500 dark:bg-fuchsia-600 text-white"
              : "bg-emerald-200 dark:bg-fuchsia-900 text-emerald-800 dark:text-fuchsia-100"
          }`}
          onClick={() => onModeChange("words")}
        >
          Find Words
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            mode === "questions"
              ? "bg-emerald-500 dark:bg-fuchsia-600 text-white"
              : "bg-emerald-200 dark:bg-fuchsia-900 text-emerald-800 dark:text-fuchsia-100"
          }`}
          onClick={() => onModeChange("questions")}
        >
          Answer Questions
        </button>
      </div>
    </div>
  );
}
