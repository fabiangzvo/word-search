import { Fragment, useCallback, type JSX } from "react";

import { CategoryForm } from "../categoryForm";
import { CategoryList } from "../categoryList";
import { CategorySectionProps } from "./types";

export function CategorySection({
  categories,
  updateCategory,
}: CategorySectionProps): JSX.Element {
  const addCategory = useCallback(
    (category: string) => {
      if (updateCategory) updateCategory([...categories, category])
    },
    [categories, updateCategory]
  )

  return (
    <Fragment>
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-xl">Categorias</span>
        <CategoryForm addCategory={addCategory} />
      </div>
      <CategoryList categories={categories} updateCategory={updateCategory} />
    </Fragment>
  )
}