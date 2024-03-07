'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { ComponentProps, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

interface ButtonLoadingProps extends ComponentProps<'button'> {
  children: string | ReactNode;
  isLoading?: boolean;
}

const ComponentLoader = () => (
  <Loader2 className="animate-spin h-5 w-5 text-white" />
);

export const ButtonLoading = ({
  children,
  isLoading,
  ...props
}: ButtonLoadingProps) => {
  const { pending } = useFormStatus();

  const loading = isLoading || pending;

  const element = loading ? <ComponentLoader /> : children;

  return (
    <Button
      className={cn('w-full', props.className)}
      type="submit"
      aria-disabled={loading}
      disabled={loading}
      {...props}
    >
      {element}
    </Button>
  );
};
