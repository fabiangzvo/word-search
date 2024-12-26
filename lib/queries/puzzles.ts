"use server";
import { FilterQuery } from "mongoose";

import Puzzle from "@models/puzzle";
import { IPuzzle } from "@models/puzzle";

export async function getAllPuzzles(
  params?: FilterQuery<IPuzzle>
): Promise<IPuzzle[]> {
  const response = await Puzzle.find<IPuzzle>(params || {}).exec();

  return response;
}
