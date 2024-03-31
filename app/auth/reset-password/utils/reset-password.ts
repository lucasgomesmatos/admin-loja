import { z } from "zod";

export const handleDisabledResetPassword = ({
  password,
  confirmationPassword,
}: {
  password: string;
  confirmationPassword: string;
}) => {
  if (password !== confirmationPassword) return true;

  const schema = z.object({
    password: z.string().min(6),
    confirmationPassword: z.string().min(6),
  });

  const data = schema.safeParse({
    password,
    confirmationPassword,
  });

  return !data.success;
};
