import {
  ChevronDown,
  Home,
  Layers2,
  Library,
  Menu,
  ScanBarcode,
  User,
  Users,
} from "lucide-react";
import { NavLink } from "./nav-link";
import { Separator } from "./ui/separator";

import { fetchProfile } from "@/app/actions/auth/me";
import { ButtonLogout } from "./button-logout";

import { Drawer } from "./drawer";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetTrigger } from "./ui/sheet";

export default async function Sidebar() {
  const { name, email, role } = await fetchProfile();

  return (
    <Sheet>
      <header className="border-b border-muted-foreground/50">
        <div className="flex h-16 items-center gap-6 px-6">
          {role === "ADMIN" && (
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          )}
          <Library className="h-6 w-6" />
          <Separator
            orientation="vertical"
            className="h-6 bg-muted-foreground/50 hidden md:block"
          />
          <nav className=" items-center space-x-4 lg:space-x-6 hidden md:flex">
            {role === "ADMIN" && (
              <>
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
              </>
            )}
            {role === "MEMBER" && (
              <NavLink href="/dashboard/orders">
                <ScanBarcode className="h-4 w-4" />
                Pedidos
              </NavLink>
            )}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex select-none items-center gap-2"
                >
                  <User className="h-4 w-4" />
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

                <ButtonLogout />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <Drawer role={role} />
    </Sheet>
  );
}
