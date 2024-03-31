"use server";

import { environment } from "@/lib/env";
import { apiError } from "@/utils/functions/api-error";

export async function resetPasswordAction(state: {}, formData: FormData) {
  const password = formData.get("password") as string;
  const confirmationPassword = formData.get("confirmation-password") as string;
  const token = formData.get("token") as string;

  const baseUrl = environment.NEXT_PUBLIC_API_BASE_URL;

  try {
    if (password !== confirmationPassword) {
      throw new Error("As senhas não conferem!");
    }

    const response = await fetch(`${baseUrl}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    });

    console.log(response);

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
