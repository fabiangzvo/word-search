"use server";

import Category from "@models/category";
import { ICategory, GetCategories } from "@/types/category";

export async function getCategories({
  filters,
  projection,
}: GetCategories): Promise<ICategory[]> {
  const response = await Category.find<ICategory>(
    filters || {},
    projection
  ).exec();

  return response;
}

export async function checkNotCreatedCategories(
  categoriesStr: string[]
): Promise<{ notCreated: string[]; matches: ICategory[] }> {
  const categoryMatches = await getCategories({
    filters: {
      name: { $in: categoriesStr },
    },
  });

  const notCreated = categoriesStr.filter(
    (category) =>
      !categoryMatches.some((categoryFound) => categoryFound.name === category)
  );

  return { notCreated, matches: categoryMatches };
}

export async function createCategories(
  categories: ICategory[]
): Promise<ICategory[]> {
  const response = await Category.insertMany(categories);

  return response;
}
