"use client";
import { createProductAction } from "@/app/actions/products/create-product";
import { fetchDeleteFiles } from "@/app/actions/products/delete-files";
import { ButtonLoading } from "@/components/button-loading";
import DropzoneInput from "@/components/dropzone-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileContent } from "@/utils/types/file-content";
import { KeyRound, Type } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useProductStore } from "../store/store";
import {
  appendFilesToFormData,
  formFieldsFilledOutCorrectlyUpdate,
  initialStateCreateProduct,
} from "../utils/products-utils";

interface FormUpdateProductProps {
  files: FileContent[];
}

export default function FormUpdateProduct({ files }: FormUpdateProductProps) {
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
  });

  const onSubmit = async (data: FormData) => {
    if (productFiles.length) {
      for (const file of productFiles) {
        const formData = appendFilesToFormData(data, file);
        await action(formData);
      }
    }

    if (productFilesDelete.length) {
      await actionDelete();
    }
  };

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
