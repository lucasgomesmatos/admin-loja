import { api } from "@/lib/fecth";

interface UserProps {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: "ADMIN" | "MEMBER";
}

export async function fetchProfile(): Promise<UserProps> {
  const response = await api("me");
  const profile = await response.json();

  return profile;
}
