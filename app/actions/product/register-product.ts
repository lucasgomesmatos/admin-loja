import { apiError } from '@/utils/functions/api-error';

export async function registerProductAction(state: {}, formData: FormData) {
  const files = formData.get('files') as string;

  console.log(files);

  try {
    return {
      data: null,
      ok: true,
      error: '',
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
