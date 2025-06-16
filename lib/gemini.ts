'use server'

import {
  GoogleGenerativeAI,
  type ResponseSchema,
  SchemaType,
} from '@google/generative-ai'
import { decode } from 'html-entities'

import { extractJsonObject } from '@utils/json'
import { type GeminiResponse } from '@/types/gemini'

const schemaResponse: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    description: {
      type: SchemaType.STRING,
      description: 'short description to attract the attention of users',
    },
    questions: {
      type: SchemaType.ARRAY,
      description: 'list of word search questions and answers',
      items: {
        type: SchemaType.OBJECT,
        properties: {
          label: {
            type: SchemaType.STRING,
            description:
              'question which contains the answer found in the word search',
          },
          answer: {
            type: SchemaType.STRING,
            description:
              'answer of question and it is in the word search puzzle',
          },
        },
        required: ['label', 'answer'],
      },
    },
    categories: {
      type: SchemaType.ARRAY,
      description: 'list of categories based on the context provided',
      items: {
        type: SchemaType.STRING,
      },
    },
  },
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '')
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    responseMimeType: 'application/json',
    responseSchema: schemaResponse,
  },
})

export async function GenerateQuestions(
  numberOfQuestions: number,
  context: string
): Promise<GeminiResponse> {
  const prompt = `Generate ${numberOfQuestions} questions about '${context}' with one-word answers. Answers must not be numbers.

Then, write a short and engaging description in Spanish to invite users to play a word search puzzle based on this topic.

Finally, generate a list of 3 to 5 categories strictly based on '${context}', using the following rules:

- Each category name must include the full context or part of it to make it clear (e.g. "patrones de diseño", "patrones de diseño creacionales", etc.)
- Do not return generic or ambiguous labels (like "Creacionales", "Estructurales")
- The categories must be written as complete descriptive phrases in Spanish that are clearly derived from the context
- Each category must clearly relate to the context.
- Each category must include no more than 3 words.
- Avoid generic labels; use meaningful and specific terms connected to the context.

All content must be in Spanish.`

  const result = await model.generateContent(prompt)

  const response = result.response.text()
  const data = extractJsonObject<GeminiResponse>(decode(response))

  return data
}
