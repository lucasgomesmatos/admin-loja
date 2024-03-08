'use client';

import { logoutUser } from '@/app/actions/auth/logout';
import { LogOut } from 'lucide-react';
import { DropdownMenuItem } from './ui/dropdown-menu';

export const ButtonLogout = () => {
  const handleLogout = () => logoutUser();

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      className="cursor-pointer text-rose-500 dark:text-rose-400"
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Sair</span>
    </DropdownMenuItem>
  );
};
