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
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useProductStore } from "../store/store";
import {
  appendFilesToFormData,
  formFieldsFilledOutCorrectly,
  initialStateCreateProduct,
} from "../utils/products-utils";

import { Button } from "@/components/ui/button";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function FormRegisterProduct() {
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true);

  const {
    productId,
    productName,
    reset,
    productFiles,
    addProductNameValueAction,
    addProductIdValueAction,
    resetOnLoad,
  } = useProductStore();

  const [state, action] = useFormState(
    createProductAction,
    initialStateCreateProduct
  );

  useEffect(() => {
    resetOnLoad();
  }, [resetOnLoad]);

  useEffect(() => {
    if (state.error.length) {
      toast.error(state.error);
    }
    if (state.ok && productId) {
      reset();
      toast.success(`Produto e arquivos registrados com sucesso.`);
    }
  }, [state, productId, reset]);

  const onSubmit = async (data: FormData) => {
    for (const file of productFiles) {
      const formData = appendFilesToFormData(data, file);
      await action(formData);
    }
  };

  const buttonDisabled = formFieldsFilledOutCorrectly({
    name: productName!,
    id: productId!,
    files: productFiles,
  });

  return (
    <form action={onSubmit} className="grid grid-cols-2 gap-8 max-w-[880px]">
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
                  Selecione alguma categoria
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[420px]">
                <DropdownMenuCheckboxItem
                  checked={showStatusBar}
                  onCheckedChange={setShowStatusBar}
                >
                  Todas
                </DropdownMenuCheckboxItem>
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
