import { Question } from "./puzzle";

export interface GeminiResponse {
  description: string
  questions: Question[];
  categories: string[];
}
