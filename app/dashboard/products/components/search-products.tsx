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
import { Category } from "@/utils/types/category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { generateCheckbox } from "../utils/products-utils";

interface SearchProductsProps {
  categories: Category[];
}

export const SearchProducts = ({ categories }: SearchProductsProps) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('search') ?? '';

  const [text, setText] = useState(query);
  const filter = useDebounce(2000, text);

  const [checkboxes, setCheckboxes] = useState(
    generateCheckbox({ categories, checked: false })
  );

  const handleOptionCheckboxes = useCallback((id: string) => {
    setCheckboxes(prevCheckboxes =>
      prevCheckboxes.map(checkbox =>
        checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
      )
    );
  }, []);

  const generateSearchParams = useCallback(() => {
    const params = new URLSearchParams();

    if (filter) {
      params.set('search', filter);
      params.set('page', '1');
    }

    const categoriesData = checkboxes
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.id)
      .join(',');
    if (categoriesData) {
      params.set('categories', categoriesData);
      params.set('page', '1');
    }

    return params;
  }, [filter, checkboxes]);

  const handleSearchAndPagination = useCallback(() => {
    const params = generateSearchParams();
    push(`${pathname}?${params.toString()}`);
  }, [generateSearchParams, push, pathname]);

  useEffect(() => {
    handleSearchAndPagination();
  }, [handleSearchAndPagination]);


  return (
    <header className="flex w-full md:h-14   items-center gap-4 border-b  px-6 ">
      <div className="w-full flex items-center justify-between flex-col md:flex-row ">
        <form className="w-80 mt-4 md:m-0">
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
            <div className="flex h-[60px] items-center  w-80 md:w-56 ">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex select-none items-center gap-2 w-full justify-between"
                  >
                    Categorias
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className=" w-80 md:w-56">
                  <DropdownMenuLabel>
                    Selecione alguma categoria
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {checkboxes?.map((checkbox) => (
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
