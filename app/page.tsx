import WordSearchGame from "@components/wordSearchGame"

import { createWordSearch } from "./actions";

export default async function Home() {
  const response = await createWordSearch();
  console.log(response);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <WordSearchGame matriz={response.matriz}/>
      <div className="mt-8">{JSON.stringify(response)}</div>
    </section>
  );
}
