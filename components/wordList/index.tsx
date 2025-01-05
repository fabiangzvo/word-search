import { useState, useEffect, JSX } from "react";
import Confetti from "react-confetti";

import { WordListProps } from "./types";

export default function WordList(props: WordListProps): JSX.Element {
  const { questions, foundWords, mode } = props;
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  useEffect(() => {
    if (mode === "questions" && foundWords.length > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [foundWords, mode]);

  return (
    <div className="mt-6 p-4 bg-white dark:bg-fuchsia-950 rounded-xl shadow-md">
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <h2 className="text-2xl font-bold mb-4 text-emerald-800 dark:text-fuchsia-100">
        {mode === "words" ? "Words to Find:" : "Questions to Answer:"}
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {questions.map((question) => (
          <li key={question.answer} className="mb-2">
            {mode === "words" ? (
              <span
                className={`text-lg font-medium p-2 rounded ${
                  foundWords.includes(question.answer)
                    ? "line-through text-emerald-600 dark:text-fuchsia-300 bg-emerald-100 dark:bg-fuchsia-900"
                    : "text-emerald-800 dark:text-fuchsia-100"
                }`}
              >
                {question.answer}
              </span>
            ) : (
              <div>
                <p className="text-lg font-medium mb-1 text-emerald-800 dark:text-fuchsia-100">
                  {question.label}
                </p>
                {foundWords.includes(question.answer) && (
                  <span className="text-lg font-bold text-emerald-600 dark:text-fuchsia-300 flex items-center">
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Answer: {question.answer}
                  </span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
