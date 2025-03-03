"use client";

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

import { updateProductAndUploadFilesAction } from "@/app/actions/products/update-product-and-upload-files";
import { INITIAL_STATE_NOTIFICATION } from "@/utils/functions/constants";
import { Category } from "@/utils/types/category";
import { FileContent } from "@/utils/types/file-content";
import { ChevronDown, KeyRound, Type } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useProductStore } from "../store/store";
import {
  appendFormDataUpdateUploadFiles,
  isDisabledUpdateProduct
} from "../utils/products-utils";

interface FormUpdateProductProps {
  productId: string;
  files: FileContent[];
  categories: Category[];
  categoriesChecked: Category[];
}

export default function FormUpdateProduct({
  productId,
  files,
  categories,
  categoriesChecked,
}: FormUpdateProductProps) {
  const nameProduct = useSearchParams().get("name");
  const idWoocommerce = useSearchParams().get("idWoocommerce");

  const { replace } = useRouter();

  const {
    productName,
    woocommerceId,
    productFiles,
    setProductCurrentFilesAction,
    addProductNameValueAction,
    addProductWoocommerceIdValueAction,
    productFilesDelete,
    currentProductFiles,
    resetUpdate,
    generateCheckboxes,
    checkboxes,
    addCheckboxAction,
    resetOnLoad,
  } = useProductStore();

  const [state, action] = useFormState(
    updateProductAndUploadFilesAction,
    INITIAL_STATE_NOTIFICATION
  );

  useEffect(() => {
    resetOnLoad();
    generateCheckboxes(categories, false, categoriesChecked);
  }, [resetOnLoad, generateCheckboxes, categories, categoriesChecked]);


  useEffect(() => {
    setProductCurrentFilesAction(files);
    addProductNameValueAction(nameProduct!);
    addProductWoocommerceIdValueAction(idWoocommerce!);
  }, [
    files,
    setProductCurrentFilesAction,
    addProductNameValueAction,
    addProductWoocommerceIdValueAction,
    nameProduct,
    idWoocommerce,
  ]);


  useEffect(() => {
    if (state.error && state.error.length) {
      state.error = null;
      toast.error(state.error);
    }
    if (state.ok && woocommerceId) {
      resetUpdate();
      state.ok = false;
      replace(`/dashboard/products`);
      toast.success(`Produto e arquivos atualizados com sucesso.`);
    }
  }, [state, woocommerceId, resetUpdate, replace]);


  const buttonDisabled = isDisabledUpdateProduct({
    name: productName!,
    id: productId!,
    files: currentProductFiles,
    checkboxes,
    productFiles
  });

  const onSubmit = async (data: FormData) => {
    const form = appendFormDataUpdateUploadFiles(data, productFiles, checkboxes, productFilesDelete, productId);
    await action(form);
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
              value={woocommerceId!}
              onChange={({ target }) => addProductWoocommerceIdValueAction(target.value)}
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
                    onCheckedChange={() => addCheckboxAction(checkbox.id)}
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
