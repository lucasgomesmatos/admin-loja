import { FormSchemaProduct } from '@/app/dashboard/products/components/form-register-product';
import { httpClient } from '@/utils/functions/axios';
import axios, { isAxiosError } from 'axios';
import { revalidateTag } from 'next/cache';
import { toast } from 'sonner';

interface RegisterProductRequest {
  nameProduct: string;
  idWoocommerce: string;
  contentType: string;
  nameFile: string;
}

async function sendFiles(file: File, data: RegisterProductRequest) {
  const response = await httpClient.post('/uploads', data);
  const { signedUrl } = await response.data;

  await axios.put(signedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
}

export async function registerProductAction(data: FormSchemaProduct) {
  try {
    const { name, id, files } = data;

    for (const file of files) {
      const data: RegisterProductRequest = {
        nameProduct: name,
        idWoocommerce: id,
        contentType: file.type,
        nameFile: file.name,
      };

      await sendFiles(file, data);
      toast.success(`Produto; arquivo ${file.name} registrado com sucesso`);
    }

    revalidateTag('get-all-products');
    return {
      ok: true,
      error: '',
      data: null,
    };
  } catch (error: unknown) {
    if (isAxiosError(error) && error.status === 400) {
      toast.error(error.message);
    }

    return {
      ok: false,
      error: 'Erro ao registrar produto',
      data: null,
    };
  }
}
