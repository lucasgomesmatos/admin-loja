"use client";
import { createProductAction } from "@/app/actions/products/create-product";
import { fetchDeleteFiles } from "@/app/actions/products/delete-files";
import { ButtonLoading } from "@/components/button-loading";
import DropzoneInput from "@/components/dropzone-input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category } from "@/utils/types/category";
import { FileContent } from "@/utils/types/file-content";
import { ChevronDown, KeyRound, Type } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useProductStore } from "../store/store";
import {
  appendFilesToFormData,
  formFieldsFilledOutCorrectlyUpdate,
  generateCheckbox,
  initialStateCreateProduct,
} from "../utils/products-utils";

interface FormUpdateProductProps {
  files: FileContent[];
  categories: {
    id: string;
    name: string;
  }[];
  categoriesChecked: Category[];
}

export default function FormUpdateProduct({
  files,
  categories,
  categoriesChecked,
}: FormUpdateProductProps) {
  const nameProduct = useSearchParams().get("name");
  const idWoocommerce = useSearchParams().get("idWoocommerce");

  const { replace } = useRouter();

  const {
    productName,
    productId,
    productFiles,
    setProductCurrentFilesAction,
    addProductNameValueAction,
    addProductIdValueAction,
    productFilesDelete,
    resetUpdate,
    currentProductFiles,
  } = useProductStore();

  const [state, action] = useFormState(
    createProductAction,
    initialStateCreateProduct
  );

  const [stateUpdate, actionDelete] = useFormState(
    () => fetchDeleteFiles(productFilesDelete),
    initialStateCreateProduct
  );

  const [checkboxes, setCheckboxes] = useState(
    generateCheckbox({ categories, checked: false, categoriesChecked })
  );

  const handleOptionCheckboxes = (id: string) => {
    setCheckboxes(
      checkboxes.map((checkbox) => {
        if (checkbox.id === id) {
          return {
            ...checkbox,
            checked: !checkbox.checked,
          };
        }
        return checkbox;
      })
    );
  };

  useEffect(() => {
    setProductCurrentFilesAction(files);
    addProductNameValueAction(nameProduct!);
    addProductIdValueAction(idWoocommerce!);
  }, [
    files,
    setProductCurrentFilesAction,
    addProductNameValueAction,
    addProductIdValueAction,
    nameProduct,
    idWoocommerce,
  ]);

  useEffect(() => {
    if (stateUpdate.error.length) {
      toast.error(stateUpdate.error);
    }

    if (stateUpdate.ok && productId) {
      replace(`/dashboard/products`);
      toast.success(`Arquivos atualizados com sucesso.`);
    }
  }, [stateUpdate, productId, replace]);

  useEffect(() => {
    if (state.error.length) {
      toast.error(state.error);
    }
    if (state.ok && productId) {
      resetUpdate();
      replace(`/dashboard/products`);
      toast.success(`Produto e arquivos registrados com sucesso.`);
    }
  }, [state, productId, resetUpdate, replace]);

  const buttonDisabled = formFieldsFilledOutCorrectlyUpdate({
    name: productName!,
    id: productId!,
    files: productFiles,
    filesProductDelete: productFilesDelete,
    filesCurrent: currentProductFiles,
    checkboxes,
  });

  const onSubmit = async (data: FormData) => {
    if (productFiles.length) {
      for (const file of productFiles) {
        const formData = appendFilesToFormData(data, file, checkboxes);
        await action(formData);
      }
    }

    if (productFilesDelete.length) {
      await actionDelete();
    }
  };

  return (
    <form action={onSubmit} className="grid md:grid-cols-2 gap-8 max-w-[880px]">
      <div className="space-y-2">
        <div className=" space-y-1">
          <Label>Nome do produto</Label>
          <div className="relative">
            <Type className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full bg-white shadow-none appearance-none pl-8  placeholder:text-sm"
              placeholder="ex: bingo da matemática"
              value={productName!}
              name="name"
              onChange={({ target }) => addProductNameValueAction(target.value)}
            />
          </div>
        </div>
        <div className=" space-y-1">
          <Label>Id do Woocommerce</Label>
          <div className="relative">
            <KeyRound className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full bg-white shadow-none appearance-none pl-8  placeholder:text-sm"
              placeholder="ex: 1234"
              name="id"
              value={productId!}
              onChange={({ target }) => addProductIdValueAction(target.value)}
              title="Digite números"
            />
          </div>
        </div>
        <div className=" space-y-1">
          <div className="flex h-[60px] items-center w-full ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full">
                <Button
                  variant="outline"
                  className="flex select-none items-center gap-2 justify-between"
                >
                  Selecione pelo menos uma categoria
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[420px]">
                {checkboxes.map((checkbox) => (
                  <DropdownMenuCheckboxItem
                    onCheckedChange={() => handleOptionCheckboxes(checkbox.id)}
                    checked={checkbox.checked}
                    key={checkbox.id}
                  >
                    {checkbox.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <ButtonLoading disabled={buttonDisabled} type="submit">
          Salvar
        </ButtonLoading>
      </div>

      <div className="relative space-y-4">
        <Label>Selecione os aquivos:</Label>
        <DropzoneInput />
      </div>
    </form>
  );
}
