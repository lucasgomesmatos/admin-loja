import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Home, Layers2, Library, ScanBarcode, Users } from "lucide-react";
import { NavLink } from "./nav-link";

interface DrawerProps {
  role: "ADMIN" | "MEMBER";
}

export const Drawer = ({ role }: DrawerProps) => {
  return (
    <SheetContent side="left">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2 ml-3 mt-4 text-sm">
          <Library className="size-5" />
          Lojinha de Atividades
        </SheetTitle>
      </SheetHeader>

      <nav className="flex flex-col mt-4">
        {role === "ADMIN" && (
          <>
            <NavLink href="/dashboard/home">
              <Home className="size-4" />
              Home
            </NavLink>
            <NavLink href="/dashboard/users">
              <Users className="size-4" />
              Usuários
            </NavLink>

            <NavLink href="/dashboard/categories">
              <Layers2 className="size-4" />
              Categorias
            </NavLink>

            <NavLink href="/dashboard/products">
              <ScanBarcode className="size-4" />
              Produtos
            </NavLink>
          </>
        )}
        {role === "MEMBER" && (
          <NavLink href="/dashboard/orders">
            <ScanBarcode className="size-4" />
            Pedidos
          </NavLink>
        )}
      </nav>
    </SheetContent>
  );
};
