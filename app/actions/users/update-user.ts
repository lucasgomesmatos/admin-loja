"use server";

import { api } from "@/lib/fecth";
import { apiError } from "@/utils/functions/api-error";
import { revalidatePath } from "next/cache";

interface FetchUpdateUser {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

export async function fetchUpdateUser({
  name,
  email,
  cpf,
  phone,
}: FetchUpdateUser) {
  try {
    const response = await api("users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        cpf,
        phone,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar usuário");
    }

    revalidatePath("/users");

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
