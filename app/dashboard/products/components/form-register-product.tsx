'use client';
import { createProductAction } from '@/app/actions/product/create-product';
import { ButtonLoading } from '@/components/button-loading';
import DropzoneInput from '@/components/dropzone-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, Type } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { useProductContext } from '../context/product-context';
import {
  appendFilesToFormData,
  formFieldsFilledOutCorrectly,
  initialStateCreateProduct,
} from '../utils/products-utils';

export default function FormRegisterProduct() {
  const { product, addNameValue, addIdValue, removeAll } = useProductContext();
  const [state, action] = useFormState(
    createProductAction,
    initialStateCreateProduct,
  );

  const { replace } = useRouter();

  useEffect(() => {
    if (state.error.length) {
      toast.error(state.error);
    }
    if (state.ok && product.id) {
      removeAll();
      toast.success(`Produto e arquivos registrados com sucesso.`);
    }
  }, [state, replace, product.id, removeAll]);

  const onSubmit = async (data: FormData) => {
    for (const file of product.files) {
      const formData = appendFilesToFormData(data, file);
      await action(formData);
    }
  };

  const buttonDisabled = formFieldsFilledOutCorrectly({
    name: product.name!,
    id: product.id!,
    files: product.files,
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
              value={product.name || ''}
              name="name"
              onChange={({ target }) => addNameValue(target.value)}
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
              value={product.id || ''}
              onChange={({ target }) => addIdValue(target.value)}
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
