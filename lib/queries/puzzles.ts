"use server";

import Puzzle from "@models/puzzle";
import { GetPuzzle, IPuzzle } from "@/types/puzzle";

export async function getAllPuzzles({
  filters,
  projection,
}: GetPuzzle): Promise<IPuzzle[]> {
  const response = await Puzzle.find<IPuzzle>(filters || {}, projection).exec();

  return response;
}
