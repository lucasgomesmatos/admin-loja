"use server";

import { api } from "@/lib/fecth";
import { apiError } from "@/utils/functions/api-error";
import { revalidatePath } from "next/cache";

export async function fetchDeleteCategory(categoryId: string) {
  try {
    const response = await api(`categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir categoria");
    }

    revalidatePath("/categories");

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
