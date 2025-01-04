import mongoose, { Model, Schema } from "mongoose";

import { IPuzzle } from "@/types/puzzle";

const puzzleSchema = new Schema<IPuzzle>({
  title: { type: String, required: true },
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
  owner: { type: Schema.Types.ObjectId, ref: "users", required: true },
  categories: {
    type: [Schema.Types.ObjectId],
    ref: "categories",
    required: true,
  },
});

// puzzleSchema.set("toJSON", {
//   transform: (_, record) => {
//     record._id = record._id.toString();
//     record.owner = record.owner.toString();
//     record.categories = record.categories.map(
//       (category: Schema.Types.ObjectId) => category.toString()
//     );

//     delete record.__v;
//   },
// });

export default (mongoose.models.puzzles as Model<IPuzzle>) ||
  mongoose.model<IPuzzle>("puzzles", puzzleSchema);
