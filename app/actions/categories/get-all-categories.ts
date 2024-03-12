import { api } from "@/lib/fecth";

interface CategoriesResponse {
  id: string;
  name: string;
}

export async function fetchCategories(
  page = 1,
  query = "",
  paginate = false
): Promise<CategoriesResponse[]> {
  const response = await api(
    `categories?page=${page}&query=${query}&paginate=${paginate}`,
    {
      cache: "no-cache",
      next: {
        tags: ["categories"],
      },
    }
  );

  const categories = await response.json();

  return categories;
}
