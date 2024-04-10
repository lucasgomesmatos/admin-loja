"use client";
import { ButtonLoading } from "@/components/button-loading";
import DropzoneInput from "@/components/dropzone-input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, KeyRound, Type } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useProductStore } from "../store/store";
import {
  appendFormDataUploadFiles,
  isDisabledCreateProduct
} from "../utils/products-utils";

import { Button } from "@/components/ui/button";

import { createProductAndUploadFilesAction } from "@/app/actions/products/create-product-and-upload-files";
import { INITIAL_STATE_NOTIFICATION } from "@/utils/functions/constants";
import { Category } from "@/utils/types/category";

interface FormRegisterProductUploadFilesProps {
  categories: Category[];
}

export default function FormRegisterProductUploadFiles({
  categories,
}: FormRegisterProductUploadFilesProps) {

  const {
    productId,
    woocommerceId,
    productName,
    reset,
    productFiles,
    addProductNameValueAction,
    addProductWoocommerceIdValueAction,
    checkboxes,
    generateCheckboxes,
    addCheckboxAction,
    resetOnLoad,
  } = useProductStore();

  const [state, action] = useFormState(
    () => createProductAndUploadFilesAction(
      {
        name: productName!,
        woocommerceId: Number(woocommerceId!),
        productFiles,
        categories: checkboxes,
      }
    ),
    INITIAL_STATE_NOTIFICATION
  );

  useEffect(() => {
    resetOnLoad();
    generateCheckboxes(categories, false);
  }, [
    resetOnLoad, categories, generateCheckboxes,]);


  useEffect(() => {
    if (state?.error && state.error.length) {
      toast.error(state.error);
      state.error = null
    }
    if (state.ok && productId) {
      reset();
      toast.success(`Produto e arquivos registrados com sucesso.`);
      state.ok = false;
    }
  }, [state, productId, reset]);

  const buttonDisabled = isDisabledCreateProduct({
    name: productName!,
    id: woocommerceId!,
    files: productFiles,
    checkboxes,
  })

  const onSubmit = async (data: FormData) => {
    const form = appendFormDataUploadFiles(data, productFiles, checkboxes);
    console.log(Object.fromEntries(form.entries()));
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
              value={productName || ""}
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
              value={woocommerceId || ""}
              onChange={({ target }) => addProductWoocommerceIdValueAction(target.value)}
              title="Digite números"
            />
          </div>
        </div>
        <div className=" space-y-1">
          <div className="flex h-[60px] items-center w-full ">
            <DropdownMenu >
              <DropdownMenuTrigger asChild className="w-full" >
                <Button
                  variant="outline"
                  className="flex select-none items-center gap-2 justify-between"
                >
                  Selecione pelo menos uma categoria
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[420px]">
                {checkboxes?.map((checkbox) => (
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
