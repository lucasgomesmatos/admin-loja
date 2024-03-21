export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

export const UserRole = {
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
};
