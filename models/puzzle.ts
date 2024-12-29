import mongoose, { Schema } from "mongoose";

import { IPuzzle } from "@/types/puzzle";

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
