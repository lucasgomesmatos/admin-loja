"use server";

import { api } from "@/lib/fecth";
import { apiError } from "@/utils/functions/api-error";
import { cookies } from "next/headers";

export async function signInUserAction(state: {}, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await api("sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Email ou senha inválidas");
    }

    const data = await response.json();

    cookies().set("session", data.refreshToken, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return {
      data: null,
      ok: true,
      error: "",
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
