import { Category } from "@/utils/types/category";
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

export interface Checkboxes {
  id: string;
  label: string;
  checked: boolean;
}

export const formFieldsFilledOutCorrectly = ({
  name,
  id,
  files,
  checkboxes,
}: {
  name: string;
  id: string;
  files: File[];
  checkboxes: Checkboxes[];
}) => {
  const checkboxesChecked = checkboxes.some((checkbox) => checkbox.checked);

  const disabled =
    Boolean(name?.length) &&
    Boolean(id?.length) &&
    Boolean(files?.length) &&
    checkboxesChecked;

  return !disabled;
};
export const formFieldsFilledOutCorrectlyUpdate = ({
  name,
  id,
  files,
  filesProductDelete,
  filesCurrent,
  checkboxes,
}: {
  name: string;
  id: string;
  files: File[];
  filesProductDelete: FileContent[];
  filesCurrent: FileContent[];
  checkboxes: Checkboxes[];
}) => {
  const checkboxesChecked = checkboxes.some((checkbox) => checkbox.checked);

  const filesLength = files.length === 0 && filesCurrent.length === 0;

  if (filesLength) return true;

  const disabledFiles =
    Boolean(files?.length) || Boolean(filesProductDelete?.length);

  const disabled =
    Boolean(name?.length) &&
    Boolean(id?.length) &&
    disabledFiles &&
    checkboxesChecked;

  return !disabled;
};

export const appendFilesToFormData = (
  data: FormData,
  file: File,
  checkboxes: Checkboxes[]
) => {
  const formData = new FormData();

  const nameProduct = data.get("name") as string;
  const idWoocommerce = data.get("id") as string;
  const categories = checkboxes
    ?.filter((checkbox) => checkbox.checked)
    ?.map((checkbox) => checkbox.id);

  formData.append("nameProduct", nameProduct);
  formData.append("idWoocommerce", idWoocommerce);
  formData.append("contentType", file.type);
  formData.append("nameFile", file.name);
  formData.append("file", file);
  formData.append("categories", JSON.stringify(categories));

  return formData;
};

export const normalizeNumber = (value: string | undefined) => {
  if (!value) return "";

  return value.replace(/\D/g, "");
};

export const generateCheckbox = ({
  categories,
  checked = true,
  categoriesChecked,
}: {
  categories: {
    id: string;
    name: string;
  }[];
  checked?: boolean;
  categoriesChecked?: Category[];
}) => {
  return categories.map((category) => {
    const categoryEqual = categoriesChecked?.find(
      (item) => item.id === category.id
    );

    if (categoryEqual) {
      return {
        id: category.id,
        label: category.name,
        checked: true,
      };
    }

    return {
      id: category.id,
      label: category.name,
      checked: checked,
    };
  });
};
