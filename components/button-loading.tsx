'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export const ButtonLoading = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full"
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? 'Entrando...' : 'Entrar'}
    </Button>
  );
};
