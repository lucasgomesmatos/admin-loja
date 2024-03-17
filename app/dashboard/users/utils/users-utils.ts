export const initialStateCreateUsers = {
  data: null,
  ok: false,
  error: "",
};

export const formUsersFieldsFilledOutCorrectly = ({
  name,
  email,
  cpf,
}: {
  name: string;
  email: string;
  cpf: string;
}) => {
  const disabled =
    Boolean(name?.length) && Boolean(email?.length) && Boolean(cpf?.length);

  return !disabled;
};
