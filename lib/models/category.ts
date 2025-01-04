import mongoose, { Schema, Model } from "mongoose";

import { ICategory } from "@/types/category";

const categorySchema = new Schema<ICategory>({
  name: { type: String },
});

export default (mongoose.models.categories as Model<ICategory>) ||
  mongoose.model<ICategory>("categories", categorySchema);
