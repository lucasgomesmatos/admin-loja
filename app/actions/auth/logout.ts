"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutUser() {
  cookies().delete("session");
  cookies().delete("auth");
  redirect("/auth/sign-in-member");
}
