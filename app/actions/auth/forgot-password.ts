"use server";

import { api } from "@/lib/fecth";
import { apiError } from "@/utils/functions/api-error";

export async function forgotPasswordAction(state: {}, formData: FormData) {
  const email = formData.get("email") as string;

  try {
    const response = await api("forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Usuário não autorizado!");
    }

    return {
      data: null,
      ok: true,
      error: "",
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
