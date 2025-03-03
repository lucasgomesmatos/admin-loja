import { api } from "@/lib/fecth";
import { Category } from "@/utils/types/category";

interface CategoriesResponse {
  categories: Category[];
  total: number;
}

export async function fetchCategories(
  page = 1,
  query = "",
  paginate = false
): Promise<CategoriesResponse> {
  const response = await api(
    `categories?page=${page}&query=${query}&paginate=${paginate}`,
    {
      cache: "no-cache",
      next: {
        tags: ["categories"],
      },
    }
  );

  const { categories, total } = await response.json();

  return {
    categories,
    total,
  };
}
