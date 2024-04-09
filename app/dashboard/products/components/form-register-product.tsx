"use client";
import { createProductAction } from "@/app/actions/products/create-product";
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
  appendFilesToFormData,
  isDisabledCreateProduct
} from "../utils/products-utils";

import { Button } from "@/components/ui/button";

import { INITIAL_STATE_NOTIFICATION } from "@/utils/functions/constants";
import { Category } from "@/utils/types/category";

interface FormRegisterProductProps {
  categories: Category[];
}

export default function FormRegisterProduct({
  categories,
}: FormRegisterProductProps) {



  const {
    productId,
    productName,
    reset,
    productFiles,
    addProductNameValueAction,
    addProductIdValueAction,
    checkboxes,
    generateCheckboxes,
    addCheckboxAction,
    resetOnLoad,
  } = useProductStore();

  const [state, action] = useFormState(
    createProductAction,
    INITIAL_STATE_NOTIFICATION
  );

  useEffect(() => {
    resetOnLoad();
    generateCheckboxes(categories, false);
  }, [
    resetOnLoad, categories, generateCheckboxes,]);


  useEffect(() => {
    if (state?.error && state.error.length) {
      state.error = null
      toast.error(state.error);
    }
    if (state.ok && productId) {
      reset();
      state.ok = false;
      toast.success(`Produto e arquivos registrados com sucesso.`);
    }
  }, [state, productId, reset]);

  const onSubmit = async (data: FormData) => {
    for (const file of productFiles) {
      const formData = appendFilesToFormData(data, file, checkboxes);
      await action(formData);
    }
  };

  const buttonDisabled = isDisabledCreateProduct({
    name: productName!,
    id: productId!,
    files: productFiles,
    checkboxes,
  })


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
              value={productId || ""}
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
