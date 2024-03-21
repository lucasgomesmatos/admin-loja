"use server";

import { environment } from "@/lib/env";
import { apiError } from "@/utils/functions/api-error";
import { FileContent } from "@/utils/types/file-content";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function fetchDeleteFiles(productFilesDelete: FileContent[]) {
  const token = cookies().get("session")?.value;

  const ids = productFilesDelete?.map((file) => file.id);

  try {
    const response = await fetch(
      `${environment.NEXT_PUBLIC_API_BASE_URL}/files`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          ids,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao excluir arquivos");
    }

    revalidatePath("/products");

    return {
      data: null,
      ok: true,
      error: "",
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
