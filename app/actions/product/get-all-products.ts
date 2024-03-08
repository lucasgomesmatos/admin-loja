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
    cache: 'no-cache',
    next: {
      tags: ['products'],
    },
  });

  const products = await response.json();

  return products;
}
