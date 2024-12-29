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
}

export interface GetPuzzle {
  filters?: FilterQuery<IPuzzle>;
  projection?: ProjectionFields<IPuzzle>;
}
