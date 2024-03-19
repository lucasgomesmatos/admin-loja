import { z } from "zod";

export const initialStateCreateUsers = {
  data: null,
  ok: false,
  error: "",
};

export const formUsersFieldsFilledOutCorrectly = ({
  name,
  email,
  cpf,
  phone,
}: {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}) => {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    cpf: z.string().length(14),
    phone: z.string().length(15),
  });

  const data = schema.safeParse({
    name,
    email,
    cpf,
    phone,
  });

  return !data.success;
};
