import { FilterQuery, ProjectionFields, Document, Types } from "mongoose";

export interface Question {
  label: string;
  answer: string;
}

export interface IPuzzle extends Document {
  title: string;
  questions: Question[];
  matrix: string[][];
  isPublic: boolean;
  owner: Types.ObjectId;
  categories: Types.ObjectId[];
}

export type InsertPuzzle = Pick<
  IPuzzle,
  "title" | "questions" | "matrix" | "isPublic" | "owner" | "categories"
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
