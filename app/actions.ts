"use server";

import {
  GoogleGenerativeAI,
  ResponseSchema,
  SchemaType,
} from "@google/generative-ai";

import Puzzle from "@models/puzzle";
import { generateWordSearch } from "@utils/wordSearchGenerator";
import { extractJsonObject } from "@utils/json";

const schemaResponse: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    questions: {
      type: SchemaType.ARRAY,
      description: "list of word search questions and answers",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          label: {
            type: SchemaType.STRING,
            description:
              "question which contains the answer found in the word search",
          },
          answer: {
            type: SchemaType.STRING,
            description:
              "answer of question and it is in the word search puzzle",
          },
        },
        required: ["label", "answer"],
      },
    },
  },
};

export async function createWordSearch(
  gameId: string
): Promise<Record<string, any>> {
  try {
    const puzzle = await Puzzle.find({ gameId }).exec();
    if (puzzle.length >= 1) {
      return puzzle[0];
    } else {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: schemaResponse,
        },
      });

      const prompt =
        "Genera 5 preguntas sobre el tema 'informática' con respuestas de una sola palabra.";

      const result = await model.generateContent(prompt);
      const response = result.response.text();
      const data = extractJsonObject(response);

      const { grid } = generateWordSearch(
        data.questions.map((item: any) => item.answer.toUpperCase()),
        15
      );

      const insertResult = await new Puzzle({
        gameId,
        ...data,
        matrix: grid,
      }).save();

      return { ...insertResult, matrix: grid };
    }
  } catch (error) {
    console.error(error);

    return {};
  }
}
