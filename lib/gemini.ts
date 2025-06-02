'use server'

import {
  GoogleGenerativeAI,
  type ResponseSchema,
  SchemaType,
} from '@google/generative-ai'
import { extractJsonObject } from '@utils/json'

import { type GeminiResponse } from '@/types/gemini'

const schemaResponse: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    description:{
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
  topics: string
): Promise<GeminiResponse> {
  const prompt = `Generate ${numberOfQuestions} questions on the topic '${topics}' with one-word answers. additionally add a short description to attract the attention of users.`

  const result = await model.generateContent(prompt)

  const response = result.response.text()
  const data = extractJsonObject(response)

  return data as GeminiResponse
}
