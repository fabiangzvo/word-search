import { Document, FilterQuery, ProjectionFields } from "mongoose";

export interface ICategory extends Document {
  name: string;
}

export interface GetCategories {
  filters?: FilterQuery<ICategory>;
  projection?: ProjectionFields<ICategory>;
}
