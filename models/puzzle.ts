import mongoose, { Schema, Document } from "mongoose";

interface Question {
  label: string;
  answer: string;
}

export interface IPuzzle extends Document {
  questions: Question[];
  matrix: string[][];
  isPublic: boolean;
  owner: mongoose.Types.ObjectId;
}

const puzzleSchema = new Schema<IPuzzle>({
  questions: {
    type: [
      {
        label: String,
        answer: String,
      },
    ],
    required: true,
  },
  matrix: { type: [[String]], required: true },
  isPublic: { type: Boolean, default: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.models.puzzle ||
  mongoose.model<IPuzzle>("puzzle", puzzleSchema, "puzzle");
