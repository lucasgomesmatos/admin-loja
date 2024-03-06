import { Home, Library, ScanBarcode, Users } from 'lucide-react';
import Link from 'next/link';
import { NavLink } from './nav-link';

export const SideBar = () => {
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Library className="size-5" /> Lojinha de Atividades
          </Link>
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
