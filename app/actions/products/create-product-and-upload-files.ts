"use server";

import { CheckboxesCategories } from "@/app/dashboard/products/utils/products-utils";
import { api } from "@/lib/fecth";
import { apiError } from "@/utils/functions/api-error";
import { revalidatePath } from "next/cache";

interface createProductAndUploadFilesActionProps {
  name: string;
  woocommerceId: number;
  productFiles: File[];
  categories: CheckboxesCategories[];
}

interface UploadProductResponse {
  name: string;
  keyFile: string;
  signedUrl: string
}

function normalizeFiles(files: File[]) {
  return files.map((file) => {
    return {
      name: file.name,
      contentType: file.type
    }
  })
}

function normalizeCategories(categories: CheckboxesCategories[]) {
  return categories?.filter((category) => category.checked)
    ?.map((category) => category.id)
}

async function requestUploadFilesAws(data: UploadProductResponse[], files: File[]) {
  const promises = data.map(async (item, index) => {
    if (item.name === files[index].name) {
      const response = await fetch(item.signedUrl, {
        method: "PUT",
        body: files[index]
      })

      if (!response.ok) {
        throw new Error("Erro ao salvar arquivo no servidor");
      }
    } else {
      throw new Error("Erro ao salvar arquivo no servidor");
    }
  })

  await Promise.all(promises);

}

export async function createProductAndUploadFilesAction(
  data: createProductAndUploadFilesActionProps
) {
  const { name, woocommerceId, productFiles, categories } = data;

  const categoriesIds = normalizeCategories(categories);
  const files = normalizeFiles(productFiles);

  try {
    const response = await api("/products", {
      method: "POST",
      body: JSON.stringify({
        name,
        idWoocommerce: woocommerceId,
        categories: categoriesIds,
        files
      }),
    })

    if (!response.ok) {
      throw new Error("Erro ao salvar arquivo no servidor");
    }

    const data = await response.json() as UploadProductResponse[]
    console.log(data);

    // await requestUploadFilesAws(data, productFiles);

    revalidatePath("/products");

    return {
      data: null,
      ok: true,
      success: "Produto e arquivos registrados com sucesso",
      error: "",
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
