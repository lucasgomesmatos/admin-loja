"use server";

import { api } from "@/lib/fecth";
import { apiError } from "@/utils/functions/api-error";

export async function resetPasswordAction(state: {}, formData: FormData) {
  const password = formData.get("password") as string;
  const confirmationPassword = formData.get("confirmation-password") as string;
  const token = formData.get("token") as string;

  try {
    if (password !== confirmationPassword) {
      throw new Error("As senhas não conferem!");
    }

    const response = await api("reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password, token }),
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
