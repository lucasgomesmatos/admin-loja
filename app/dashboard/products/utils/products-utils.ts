import { Category } from "@/utils/types/category";
import { FileContent } from "@/utils/types/file-content";
import { z } from "zod";

export interface CheckboxesCategories {
  id: string;
  label: string;
  checked: boolean;
}

interface IsDisabledButtonProductProps {
  name: string;
  id: string;
  files: File[];
  checkboxes: CheckboxesCategories[];
}

export const isDisabledCreateProduct = (data: IsDisabledButtonProductProps) => {
  const schema = z.object({
    name: z.string().min(3),
    id: z.string().min(3),
    files: z.array(z.instanceof(File)).min(1),
    checkboxes: z.array(z.object({
      id: z.string(),
      label: z.string(),
      checked: z.coerce.boolean()
    })).refine((value) => value.some((item) => item.checked))
  })

  return !schema.safeParse(data).success;
}

interface IsDisabledUpdateProductProps {
  name: string;
  id: string;
  files: FileContent[];
  checkboxes: CheckboxesCategories[];
  productFiles: File[] | null;
}


export const isDisabledUpdateProduct = (data: IsDisabledUpdateProductProps) => {
  const schema = z.object({
    name: z.string().min(3),
    id: z.string().min(3),
    checkboxes: z.array(z.object({
      id: z.string(),
      label: z.string(),
      checked: z.boolean()
    })).refine((value) => value.some((item) => item.checked))
  })

  const isLengthFiles = Boolean(data.files.length) || Boolean(data.productFiles?.length);

  return !Boolean(schema.safeParse(data).success && isLengthFiles)
}

export const appendFilesToFormData = (
  data: FormData,
  file: File,
  checkboxes: CheckboxesCategories[]
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
  categories: Category[];
  checked?: boolean;
  categoriesChecked?: Category[];
}) => {
  return categories?.map((category) => {
    const categoryIsEqual = categoriesChecked?.find(
      (item) => item.id === category.id
    );

    if (categoryIsEqual) {
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



export const appendFormDataUploadFiles = (
  data: FormData,
  files: File[],
  checkboxes: CheckboxesCategories[]
) => {
  const formData = new FormData();

  const name = data.get("name") as string;
  const idWoocommerce = data.get("id") as string;
  const categories = checkboxes
    ?.filter((checkbox) => checkbox.checked)
    ?.map((checkbox) => checkbox.id)

  formData.append("name", name);
  formData.append("idWoocommerce", idWoocommerce);
  formData.append("categories", JSON.stringify(categories));


  files.forEach((file, index) => {
    formData.append("files", file);
  })


  return formData;
};
