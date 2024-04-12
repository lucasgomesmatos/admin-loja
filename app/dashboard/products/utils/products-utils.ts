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

  const filesData = files.map((file, index) => {
    formData.append(`file[${index}]`, file);

    return {
      name: file.name,
      contentType: file.type,
    };
  })

  formData.append("files", JSON.stringify(filesData));
  formData.append("quantityFiles", files.length.toString());

  return formData;
};

export const appendFormDataUpdateUploadFiles = (
  data: FormData,
  files: File[],
  checkboxes: CheckboxesCategories[],
  productFilesDelete: FileContent[],
  productId: string,
) => {

  const name = data.get("name") as string;
  const idWoocommerce = data.get("id") as string;

  const categories = checkboxes
    ?.filter((checkbox) => checkbox.checked)
    ?.map((checkbox) => checkbox.id)


  const formData = new FormData();
  formData.append("productId", productId);
  formData.append("name", name);
  formData.append("idWoocommerce", idWoocommerce);
  formData.append("categories", JSON.stringify(categories));

  const filesData = files.map((file, index) => {
    formData.append(`file[${index}]`, file);

    return {
      name: file.name,
      contentType: file.type,
    };
  })

  const filesDeleteData = productFilesDelete.map((file) => {
    return {
      id: file.id,
      keyFile: file.keyFile,
    }
  })

  formData.append("deleteFiles", JSON.stringify(filesDeleteData));

  formData.append("files", JSON.stringify(filesData));
  formData.append("quantityFiles", files.length.toString());

  return formData;
};

