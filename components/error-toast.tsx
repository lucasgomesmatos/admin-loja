'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const erroObject: Record<string, string> = {
  'invalid-credentials': 'Credenciais inválidas',
  'user-not-found': 'Usuário não encontrado',
  'user-already-exists': 'Usuário já existe',
};

export default function ErrorToast() {
  const error = useSearchParams().get('error');

  console.log('error', error);

  useEffect(() => {
    if (error) {
      toast.error(erroObject[error]);
    }
  }, []);
  return <></>;
}
