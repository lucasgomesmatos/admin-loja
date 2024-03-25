"use server";

import { api } from "@/lib/fecth";
import { apiError } from "@/utils/functions/api-error";

import { createSessionLogin } from "./token";

export async function signInUserMemberAction(state: {}, formData: FormData) {
  const email = formData.get("email") as string;

  try {
    const response = await api("store/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Usuário não autorizado");
    }

    const data = await response.json();

    await createSessionLogin("auth", data.refreshToken, email);

    return {
      data: null,
      ok: true,
      error: "",
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
