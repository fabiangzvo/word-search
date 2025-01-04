"use client";

import { JSX, useMemo } from "react";

import { IPuzzle } from "@/types/puzzle";

import EmptyContent from "./components/emptyContent";

interface PuzzleListProps {
  puzzles: IPuzzle[];
}

function PuzzleList({ puzzles }: PuzzleListProps): JSX.Element {
  const items = useMemo(
    () =>
      puzzles.length > 0 ? (
        puzzles.map((puzzle, i) => <div key={i}>{puzzle.title}</div>)
      ) : (
        <EmptyContent />
      ),
    [puzzles]
  );

  return <div className="grid text-center h-full">{items}</div>;
}

export default PuzzleList;
