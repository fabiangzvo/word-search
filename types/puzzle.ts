import { FilterQuery, ProjectionFields, Document, Types } from "mongoose";

export interface Question {
  label: string;
  answer: string;
}

export type Difficult = "easy" | "medium" | "hard";

export interface IPuzzle extends Document {
  title: string;
  difficult: Difficult;
  cols: number;
  questions: Question[];
  matrix: string[][];
  isPublic: boolean;
  owner: Types.ObjectId;
  categories: Types.ObjectId[];
}

export type InsertPuzzle = Pick<
  IPuzzle,
  | "title"
  | "questions"
  | "matrix"
  | "isPublic"
  | "owner"
  | "categories"
  | "difficult"
  | "cols"
>;

export interface GetPuzzle {
  filters?: FilterQuery<IPuzzle>;
  projection?: ProjectionFields<IPuzzle>;
}

export interface IPuzzleClient {
  _id: string;
  title: string;
  questions: Question[];
  matrix: string[][];
  isPublic: boolean;
  owner: string;
  categories: string[];
}

export interface IPuzzleItem {
  _id: string;
  title: string;
  difficult: Difficult;
  cols: number;
  questionCount: number;
  isPublic: boolean;
  categories: {
    name: string;
    _id: string;
  }[];
}
