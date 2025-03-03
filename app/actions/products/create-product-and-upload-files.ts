"use server";

import { environment } from "@/lib/env";
import { apiError } from "@/utils/functions/api-error";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


interface UploadProductResponse {
  name: string;
  keyFile: string;
  signedUrl: string
}


export async function createProductAndUploadFilesAction(state: {}, formData: FormData) {
  const token = cookies().get("session")?.value;
  const { name, idWoocommerce, categories, files, uploadFiles } = extrairDadosFormData(formData);

  try {
    const response = await fetch(
      `${environment.NEXT_PUBLIC_API_BASE_URL}/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          idWoocommerce,
          categories,
          files
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao salvar arquivo no servidor");
    }
    const data = await response.json() as UploadProductResponse[];
    await uploadFilesAws(data, uploadFiles);

    revalidatePath("/products");

    return {
      data: null,
      ok: true,
      error: "",
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}

function extrairDadosFormData(formData: FormData) {
  const name = formData.get("name") as string;
  const idWoocommerce = formData.get("idWoocommerce") as string;
  const categories = JSON.parse(formData.get("categories") as string);
  const files = JSON.parse(formData.get("files") as string);
  const quantityFiles = Number(formData.get("quantityFiles"));

  const uploadFiles: File[] = []

  for (let i = 0; i < quantityFiles; i++) {
    const file = formData.get(`file[${i}]`) as File;
    uploadFiles.push(file);
  }

  return { name, idWoocommerce, categories, files, uploadFiles };
}


async function uploadFilesAws(data: UploadProductResponse[], files: File[]) {

  const uploadPromises = data.map((item, index) => {
    return fetch(item.signedUrl, {
      method: "PUT",
      headers: { "Content-Type": files[index].type },
      body: files[index],
    });
  });

  const responses = await Promise.all(uploadPromises);

  responses.forEach(response => {
    if (!response.ok) throw new Error("Erro ao salvar arquivo no AWS");
  });

}