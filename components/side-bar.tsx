'use client';

import { logoutUser } from '@/app/actions/auth/logout';
import {
  Building,
  ChevronDown,
  Home,
  Library,
  LogOut,
  ScanBarcode,
  Users,
} from 'lucide-react';
import { NavLink } from './nav-link';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface SideBarProps {
  name: string;
  email: string;
}

export const SideBar = ({ name, email }: SideBarProps) => {
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex select-none items-center gap-2"
              >
                <Library className="h-4 w-4" />
                Lojinha de Atividades
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span>{name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {email}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Building className="mr-2 h-4 w-4" />
                <span>Perfil da loja</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-rose-500 dark:text-rose-400"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <NavLink href="/dashboard/home">
              <Home className="h-4 w-4" />
              Home
            </NavLink>
            <NavLink href="#">
              <Users className="h-4 w-4" />
              Usuários
            </NavLink>

            <NavLink href="/dashboard/products">
              <ScanBarcode className="h-4 w-4" />
              Produtos
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};
