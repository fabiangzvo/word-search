import { JSX } from "react";

import { getSession } from "@lib/session";
import { getAllPuzzles } from "@lib/queries/puzzles";

async function Dashboard(): Promise<JSX.Element> {
  const session = await getSession();
  const puzzles = await getAllPuzzles();

  console.log(puzzles);
  return (
    <div>
      <h1>Hola {session?.user.name}</h1>
    </div>
  );
}

export default Dashboard;
