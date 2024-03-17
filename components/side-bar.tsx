import { api } from "@/lib/fecth";
import {
  Building,
  ChevronDown,
  Home,
  Layers2,
  Library,
  ScanBarcode,
  Users,
} from "lucide-react";
import { ButtonLogout } from "./button-logout";
import { NavLink } from "./nav-link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface SideBarProps {
  name: string;
  email: string;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

async function fetchProfile(): Promise<UserProps> {
  const response = await api("me");
  const profile = await response.json();

  return profile;
}

export async function SideBar() {
  const { name, email } = await fetchProfile();

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
              <ButtonLogout />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <NavLink href="/dashboard/home">
              <Home className="h-4 w-4" />
              Home
            </NavLink>
            <NavLink href="/dashboard/users">
              <Users className="h-4 w-4" />
              Usuários
            </NavLink>

            <NavLink href="/dashboard/categories">
              <Layers2 className="h-4 w-4" />
              Categorias
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
}
