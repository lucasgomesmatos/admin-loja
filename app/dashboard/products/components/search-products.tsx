"use client";

import { Input } from "@/components/ui/input";
import { ChevronDown, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { generateCheckbox } from "../utils/products-utils";

interface SearchProductsProps {
  categories: {
    id: string;
    name: string;
  }[];
}

export const SearchProducts = ({ categories }: SearchProductsProps) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const query = search.get("search");
  const page = search.get("page");

  const [text, setText] = useState(query ?? "");
  const filter = useDebounce(2000, text);

  const [checkboxes, setCheckboxes] = useState(
    generateCheckbox({ categories })
  );

  const handleAllCheckboxesChecked = () => {
    const allCheckboxesChecked = checkboxes.every(
      (checkbox) => checkbox.checked
    );

    setCheckboxes(
      checkboxes.map((checkbox) => {
        return {
          ...checkbox,
          checked: !allCheckboxesChecked,
        };
      })
    );
  };

  const handleOptionCheckboxes = (id: string) => {
    setCheckboxes(
      checkboxes.map((checkbox) => {
        if (checkbox.id === id) {
          return {
            ...checkbox,
            checked: !checkbox.checked,
          };
        }
        return checkbox;
      })
    );
  };

  const allCheckboxes = checkboxes.every((checkbox) => checkbox.checked);

  const handleSearchAndPagination = useCallback(() => {
    let path = pathname;

    if (filter) {
      path += `?search=${filter}`;
    }

    if (page) {
      path += `${filter ? "&" : "?"}page=${page}`;
    }

    if (checkboxes) {
      const categoriesData = checkboxes
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.id)
        .join(",");

      path += `${filter || page ? "&" : "?"}categories=${categoriesData}`;
    }

    push(path);
  }, [filter, page, pathname, push, checkboxes]);

  useEffect(() => {
    handleSearchAndPagination();
  }, [handleSearchAndPagination]);

  return (
    <header className="flex w-full h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-8 dark:bg-gray-800/40">
      <div className="w-full flex items-center justify-between">
        <form className="w-96">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className=" bg-white shadow-none appearance-none pl-8  dark:bg-gray-950 "
              placeholder="Pesquisar..."
              type="search"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </form>
        <div>
          <DropdownMenu>
            <div className="flex h-[60px] items-center border-b px-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex select-none items-center gap-2"
                  >
                    Categorias
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    Selecione alguma categoria
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={allCheckboxes}
                    onCheckedChange={handleAllCheckboxesChecked}
                  >
                    Todas
                  </DropdownMenuCheckboxItem>
                  {checkboxes.map((checkbox) => (
                    <DropdownMenuCheckboxItem
                      onCheckedChange={() =>
                        handleOptionCheckboxes(checkbox.id)
                      }
                      checked={checkbox.checked}
                      key={checkbox.id}
                    >
                      {checkbox.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
