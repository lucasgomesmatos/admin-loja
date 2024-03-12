"use server";

import { api } from "@/lib/fecth";
import { apiError } from "@/utils/functions/api-error";
import { revalidatePath } from "next/cache";

export async function fetchCreateCategory(name: string) {
  try {
    const response = await api("categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar categoria");
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
