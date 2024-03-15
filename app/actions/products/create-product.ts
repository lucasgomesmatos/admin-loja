"use server";

import { environment } from "@/lib/env";
import { apiError } from "@/utils/functions/api-error";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createProductAction(state: {}, formData: FormData) {
  const nameProduct = formData.get("nameProduct") as string;
  const idWoocommerce = formData.get("idWoocommerce") as string;
  const contentType = formData.get("contentType") as string;
  const nameFile = formData.get("nameFile") as string;
  const currentFile = formData.get("file") as File;

  const categories = JSON.parse(formData.get("categories") as string);

  const file = new FormData();
  file.append("file", currentFile);

  const token = cookies().get("token")?.value;

  try {
    const response = await fetch(
      `${environment.NEXT_PUBLIC_API_BASE_URL}/uploads`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nameProduct,
          idWoocommerce,
          contentType,
          nameFile,
          categories,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao salvar arquivo no servidor");
    }

    const data = await response.json();

    await fetch(data.signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": contentType,
      },
      body: file,
    });

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
