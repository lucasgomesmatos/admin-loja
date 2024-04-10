import { api } from "@/lib/fecth";

interface ProductsResponse {
  products: {
    id: string;
    name: string;
    idWoocommerce: string;
    files: string[];
  }[];
  total: number;
}

export async function fetchProducts(
  page = 1,
  query = "",
  categories: string
): Promise<ProductsResponse> {

  if (!categories) {
    categories = "all"
  }

  const response = await api(
    `products?page=${page}&query=${query}&categories=${categories}`,

  );

  const { products, total } = await response.json();

  return {
    products,
    total,
  };
}
