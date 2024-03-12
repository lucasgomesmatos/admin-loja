export const initialStateCreateCategory = {
  data: null,
  ok: false,
  error: "",
};

export const formCategoryFieldsFilledOutCorrectly = ({
  name,
}: {
  name: string;
}) => {
  const disabled = Boolean(name?.length);

  return !disabled;
};
