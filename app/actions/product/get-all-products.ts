import { api } from '@/lib/fecth';

interface ProductsResponse {
  id: string;
  name: string;
  idWoocommerce: string;
  files: string[];
}

export async function fetchProducts(
  page = 1,
  query = '',
): Promise<ProductsResponse[]> {
  const response = await api(`products?page=${page}&query=${query}`, {
    next: {
      revalidate: 60 * 60,
      tags: ['get-all-products'],
    },
  });

  const products = await response.json();

  return products;
}
