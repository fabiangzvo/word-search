"use server";

import Puzzle from "@lib/models/puzzle";
import { GetPuzzle, InsertPuzzle, IPuzzle } from "@/types/puzzle";

export async function getAllPuzzles({
  filters,
  projection,
}: GetPuzzle): Promise<IPuzzle[]> {
  const response = await Puzzle.find<IPuzzle>(filters || {}, projection).exec();

  return response;
}

export async function insertPuzzle(puzzle: InsertPuzzle): Promise<IPuzzle> {
  const response = await new Puzzle(puzzle).save();

  return response;
}
