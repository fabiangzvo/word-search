import { WordSearchGame } from "@components/wordSearchGame";

import { createWordSearch } from "../../actions";
import { GameProps } from "./types";

export default async function Home(props: GameProps) {
  const {
    params: { gameId },
  } = props;

  const response = await createWordSearch(gameId);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <WordSearchGame
        grid={response.matrix}
        questions={response.questions}
        gameId={gameId}
      />
    </section>
  );
}
