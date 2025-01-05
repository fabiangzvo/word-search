import { JSX } from "react";

import { getPuzzles } from "@lib/queries/puzzle";
import PuzzleList from "@components/puzzleList";
import { IPuzzleItem } from "@/types/puzzle";
import Banner from "@components/svg/banner";
import { fontKanit } from "@config/fonts";

async function Explore(): Promise<JSX.Element> {
  const puzzles = await getPuzzles<IPuzzleItem[]>({
    filters: { isPublic: true },
    projection: {
      questionsCount: { $size: "$questions" },
      title: true,
      categories: true,
      difficult: true,
      cols: true,
      isPublic: true,
      _id: true,
    },
  });

  return (
    <div>
      <div className="relative w-full h-[30vh] flex items-center justify-center bg-default-200 rounded-xl overflow-hidden mb-24 max-lg:mb-12">
        <h1 className="z-10 text-5xl text-center font-medium mb-6 px-4 drop-shadow-2xl font-kanit text-white max-md:text-2xl">
          Explora todas las sopas de letras que han sido compartidad por los
          usuarios.
        </h1>
        <Banner />
      </div>
      <PuzzleList puzzles={puzzles} hideOptions />
    </div>
  );
}

export default Explore;
