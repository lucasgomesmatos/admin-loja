'use server';

import { environment } from '@/lib/env';
import { apiError } from '@/utils/functions/api-error';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function fetchDeleteProduct(productId: string | null) {
  const token = cookies().get('token')?.value;

  try {
    const response = await fetch(
      `${environment.NEXT_PUBLIC_API_BASE_URL}/products/${productId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Erro ao excluir produto ');
    }

    revalidatePath('/products');

    return {
      data: null,
      ok: true,
      error: '',
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        data: null,
        ok: false,
        error: error.message,
      };
    }

    return apiError(error);
  }
}
