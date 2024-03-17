import { api } from "@/lib/fecth";
import { User } from "@/utils/types/user";

interface UsersResponse {
  users: User[];
  total: number;
}

export async function fetchUsers(page = 1, query = ""): Promise<UsersResponse> {
  const response = await api(`users?page=${page}&query=${query}`);

  const { users, total } = await response.json();

  return {
    users,
    total,
  };
}
