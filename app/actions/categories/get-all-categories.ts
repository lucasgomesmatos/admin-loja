import { api } from "@/lib/fecth";

interface CategoriesResponse {
  categories: {
    id: string;
    name: string;
  }[];
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
