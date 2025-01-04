"use server";

import { Types } from "mongoose";

import { InsertPuzzle, IPuzzleClient } from "@/types/puzzle";
import { FormCreatePuzzle } from "@schemas/puzzle";
import { checkNotCreatedCategories, createCategories } from "@queries/category";
import { ICategory } from "@/types/category";
import { generateWordSearch } from "@utils/wordSearchGenerator";
import { insertPuzzle } from "@queries/puzzle";

import { GenerateQuestions } from "../gemini";

export async function createPuzzle(
  formData: FormCreatePuzzle,
  userId: string
): Promise<IPuzzleClient | null> {
  try {
    const categoriesSplit = formData.topic.split(/,|,\s/g);

    const { matches, notCreated } = await checkNotCreatedCategories(
      categoriesSplit
    );

    if (notCreated.length > 0) {
      const createdCategory = await createCategories(
        notCreated.map((name) => ({ name } as ICategory))
      );

      matches.push(...createdCategory);
    }

    const { questions } = await GenerateQuestions(
      formData.numberOfQuestions,
      formData.topic
    );

    const { grid } = generateWordSearch(
      questions.map((item: any) => item.answer.toUpperCase()),
      formData.numberOfRows
    );

    const categories: Types.ObjectId[] = matches.map(
      (category) => category._id as Types.ObjectId
    );
    const record: InsertPuzzle = {
      title: formData.title,
      questions: questions,
      matrix: grid,
      isPublic: true,
      owner: new Types.ObjectId(userId),
      categories,
    };

    const insertResult = await insertPuzzle(record);

    return insertResult.toJSON({ flattenObjectIds: true }) as IPuzzleClient;
  } catch (e) {
    console.log(e);

    return null;
  }
}
