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

export async function fetchProductsByUsers(
  page = 1,
  query = "",
  categories = ""
): Promise<ProductsResponse> {
  const response = await api(
    `store/products?page=${page}&query=${query}&categories=${categories}`
  );

  const { products, total } = await response.json();

  return {
    products,
    total,
  };
}
