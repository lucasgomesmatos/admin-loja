import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { GET_PROFILE } from '@/utils/functions/api';

import { Building, ChevronDown, LogOut, Search } from 'lucide-react';

interface UserProps {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

async function fetchProfile(): Promise<UserProps> {
  const params = GET_PROFILE();
  const response = await fetch(params.url, {
    credentials: 'include',
    ...params,
  });

  const profile = await response.json();

  return profile;
}

export default async function Home() {
  const user = await fetchProfile();
  return (
    <>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-8 dark:bg-gray-800/40">
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Pesquisar..."
                  type="search"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex select-none items-center gap-2"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span>{user.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {user.email}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Building className="mr-2 h-4 w-4" />
                <span>Perfil da loja</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-rose-500 dark:text-rose-400">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <h1 className="font-bold text-gray-800 text-base">
            Bem vindo, {user.name} ! 👋
          </h1>
        </main>
      </div>
    </>
  );
}
