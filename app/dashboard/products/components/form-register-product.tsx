'use client';
import { registerProductAction } from '@/app/actions/product/register-product';
import { ButtonLoading } from '@/components/button-loading';
import DropzoneInput from '@/components/dropzone-input';
import { Input } from '@/components/ui/input';
import { KeyRound, Type } from 'lucide-react';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';

const initialState = {
  data: null,
  ok: false,
  error: '',
};

export const FormRegisterProduct = () => {
  const [state, action] = useFormState(registerProductAction, initialState);

  useEffect(() => {
    if (state.error.length) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={action} className="grid grid-cols-2 gap-8 max-w-[880px]">
      <div className="space-y-6">
        <div className="relative">
          <Type className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            className="w-full bg-white shadow-none appearance-none pl-8  dark:bg-gray-950"
            placeholder="Nome do produto"
            type="text"
            required
          />
        </div>
        <div className="relative">
          <KeyRound className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            className="w-full bg-white shadow-none appearance-none pl-8  dark:bg-gray-950"
            placeholder="ID Woocomerce"
            type="text"
            required
          />
        </div>

        <ButtonLoading type="submit">Salvar</ButtonLoading>
      </div>
      <div className="relative">
        <DropzoneInput />
      </div>
    </form>
  );
};
