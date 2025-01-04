import { JSX } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { getSession } from "@lib/session";
import { getAllPuzzles } from "@lib/queries/puzzle";
import PuzzleList from "@components/puzzleList";

async function Dashboard(): Promise<JSX.Element> {
  const session = await getSession();
  const puzzles = await getAllPuzzles({
    filters: { owner: session?.user?.id },
    projection: { questionsCount: { $size: "$questions" } },
  });

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-lg font-bold mb-6">Hola {session?.user.name}</h1>
        <Button as={Link} color="primary" variant="flat" href="/puzzle/create">
          Crear sopa de letras
        </Button>
      </div>
      <PuzzleList puzzles={puzzles} />
    </div>
  );
}

export default Dashboard;
