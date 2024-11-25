"use client"

import React, { useState, useEffect, JSX } from "react";

import WordSearchGrid from "../boardGrid";

const gridSize = 15;

export interface WordSearchGameProps {
  matriz:string[][]
}

export default function WordSearchGame (props: WordSearchGameProps) :JSX.Element{
  const [wordPositions, setWordPositions] = useState<{
    [word: string]: { start: [number, number]; end: [number, number] };
  }>({});
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

const {matriz} = props;

  const handleCellSelect = (row: number, col: number) => {
    if (!isSelecting) {
      setSelectedCells([[row, col]]);
      setIsSelecting(true);
    } else {
      const newSelectedCells = [...selectedCells, [row, col]];
      setSelectedCells(newSelectedCells);
      checkWord(newSelectedCells);
    }
  };

  const handleSelectionEnd = () => {
    setIsSelecting(false);
    if (selectedCells.length > 1) {
      checkWord(selectedCells);
    }
    setSelectedCells([]);
  };

  const checkWord = (cells: [number, number][]) => {
    const selectedWord = cells.map(([row, col]) => matriz[row][col]).join("");
    const reversedWord = selectedWord.split("").reverse().join("");

    for (const [word, position] of Object.entries(wordPositions)) {
      if (selectedWord === word || reversedWord === word) {
        if (!foundWords.includes(word)) {
          setFoundWords([...foundWords, word]);
        }
        break;
      }
    }
  };

  const handleSelectAllWords = () => {
    const newFoundWords = [...foundWords];
    const newSelectedCells: [number, number][] = [];

    Object.entries(wordPositions).forEach(([word, position]) => {
      if (!newFoundWords.includes(word)) {
        newFoundWords.push(word);
        newSelectedCells.push(position.start, position.end);
      }
    });

    setFoundWords(newFoundWords);
    setSelectedCells(newSelectedCells);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen bg-emerald-50 dark:bg-black transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-emerald-800 dark:text-fuchsia-100">
          Word Search Puzzle
        </h1>
      </div>
      <button
        onClick={handleSelectAllWords}
        className="mb-6 px-6 py-3 bg-emerald-500 dark:bg-fuchsia-600 hover:bg-emerald-600 dark:hover:bg-fuchsia-700 text-white rounded-lg shadow-md transition-colors duration-200 text-lg font-semibold"
      >
        Select All Words
      </button>
      <WordSearchGrid
        grid={matriz}
        selectedCells={selectedCells}
        onCellSelect={handleCellSelect}
        onSelectionEnd={handleSelectionEnd}
        isSelecting={isSelecting}
      />
    </div>
  );
};
