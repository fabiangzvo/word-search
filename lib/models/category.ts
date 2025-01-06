import mongoose, { Schema, type Model } from 'mongoose'

import { type ICategory } from '@/types/category'

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String },
  },
  {
    timestamps: true,
  }
)

export default (mongoose.models.categories as Model<ICategory>) ||
  mongoose.model<ICategory>('categories', categorySchema)
