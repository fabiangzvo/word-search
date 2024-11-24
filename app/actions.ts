"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

import { extractJsonObject } from "@utils/json";

export async function createWordSearch(): Promise<Record<string, any>> {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      "Crear un sopa de letras de 10x10 con una tematica de partes de computadores de 10 preguntas, con un nivel de dificultad avanzado, limitarse a devolver respuesta en formato json, donde en la propiedad matriz va la sopa de letras, en la propiedad questions es una arreglo de objetos donde tiene las propiedades de label donde se encuentra la pregunta, answer es la respuesta";

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    console.log(response);
    return extractJsonObject(response);
  } catch (error) {
    console.log(error);

    return {};
  }
}
