"use server";

import { api } from "@/lib/fecth";
import { apiError } from "@/utils/functions/api-error";
import { revalidatePath } from "next/cache";

interface FetchCreateUser {
  name: string;
  email: string;
  cpf: string;
}

export async function fetchCreateUser({ name, email, cpf }: FetchCreateUser) {
  try {
    const response = await api("users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        cpf,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar usuário");
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
