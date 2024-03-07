'use client';
import { registerProductAction } from '@/app/actions/product/register-product';
import { ButtonLoading } from '@/components/button-loading';
import DropzoneInput from '@/components/dropzone-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { productStore } from '@/utils/providers/product-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Type } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z
    .string({
      required_error: 'Nome do produto é obrigatório',
    })
    .min(3, {
      message: 'Nome do produto deve ter no mínimo 3 caracteres',
    }),
  id: z
    .string({
      required_error: 'ID Woocomerce é obrigatório',
    })
    .min(1, {
      message: 'ID Woocomerce é obrigatório',
    }),
  files: z.array(z.instanceof(File), {
    required_error: 'Pelo menos um arquivo é obrigatório',
  }),
});

export type FormSchemaProduct = z.infer<typeof formSchema>;

export const FormRegisterProduct = () => {
  const { removeAllFiles } = productStore();
  const { replace } = useRouter();

  const form = useForm<FormSchemaProduct>({
    resolver: zodResolver(formSchema),
  });

  const {
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = async (data: FormSchemaProduct) => {
    const response = await registerProductAction(data);

    if (response?.ok) {
      removeAllFiles();
      form.reset();
    }

    replace('/dashboard/products');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-8 max-w-[880px]"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do produto</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Type className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      className="w-full bg-white shadow-none appearance-none pl-8  dark:bg-gray-950"
                      placeholder="Produto..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Woocomerce </FormLabel>
                <FormControl>
                  <div className="relative">
                    <KeyRound className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      className="w-full bg-white shadow-none appearance-none pl-8  dark:bg-gray-950"
                      placeholder="1234"
                      {...field}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <ButtonLoading isLoading={isSubmitting} type="submit">
            Salvar
          </ButtonLoading>
        </div>

        <div className="relative space-y-4">
          <Label>Selecione os aquivos:</Label>
          <FormProvider {...form}>
            <DropzoneInput />
          </FormProvider>
          <FormMessage>
            {Boolean(errors.files?.message?.length) && errors.files?.message}
          </FormMessage>
        </div>
      </form>
    </Form>
  );
};
