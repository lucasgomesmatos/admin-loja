import { FileContent } from "@/utils/types/file-content";
import { z } from "zod";

export const formSchemaCreateProduct = z.object({
  name: z
    .string({
      required_error: "Nome do produto é obrigatório",
    })
    .min(3, {
      message: "Nome do produto deve ter no mínimo 3 caracteres",
    }),
  id: z
    .string({
      required_error: "ID Woocomerce é obrigatório",
    })
    .min(1, {
      message: "ID Woocomerce é obrigatório",
    }),
});

export type FormSchemaCreateProduct = z.infer<typeof formSchemaCreateProduct>;

export const initialStateCreateProduct = {
  data: null,
  ok: false,
  error: "",
};

export const formFieldsFilledOutCorrectly = ({
  name,
  id,
  files,
}: {
  name: string;
  id: string;
  files: File[];
}) => {
  const disabled =
    Boolean(name?.length) && Boolean(id?.length) && Boolean(files?.length);

  return !disabled;
};
export const formFieldsFilledOutCorrectlyUpdate = ({
  name,
  id,
  files,
  filesProductDelete,
  filesCurrent,
}: {
  name: string;
  id: string;
  files: File[];
  filesProductDelete: FileContent[];
  filesCurrent: FileContent[];
}) => {
  const filesLength = files.length === 0 && filesCurrent.length === 0;

  if (filesLength) return true;

  const disabledFiles =
    Boolean(files?.length) || Boolean(filesProductDelete?.length);

  const disabled =
    Boolean(name?.length) && Boolean(id?.length) && disabledFiles;

  return !disabled;
};

export const appendFilesToFormData = (data: FormData, file: File) => {
  const formData = new FormData();

  const nameProduct = data.get("name") as string;
  const idWoocommerce = data.get("id") as string;

  formData.append("nameProduct", nameProduct);
  formData.append("idWoocommerce", idWoocommerce);
  formData.append("contentType", file.type);
  formData.append("nameFile", file.name);
  formData.append("file", file);

  return formData;
};

export const normalizeNumber = (value: string | undefined) => {
  if (!value) return "";

  return value.replace(/\D/g, "");
};
