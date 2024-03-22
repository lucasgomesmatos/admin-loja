"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const SearchProductsOrders = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const query = search.get("search");
  const page = search.get("page");

  const [text, setText] = useState(query ?? "");
  const filter = useDebounce(2000, text);

  const handleSearchAndPagination = useCallback(() => {
    let path = pathname;

    if (filter) {
      path += `?search=${filter}`;
    }

    if (page) {
      path += `${filter ? "&" : "?"}page=${page}`;
    }

    push(path);
  }, [filter, page, pathname, push]);

  useEffect(() => {
    handleSearchAndPagination();
  }, [handleSearchAndPagination]);

  return (
    <header className="flex w-full h-14  items-center gap-4 border-b px-6">
      <div className="w-full flex items-center justify-between">
        <form className="w-96 ">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className=" bg-white shadow-none appearance-none pl-8  dark:bg-gray-950 "
              placeholder="Pesquisar..."
              type="search"
            />
          </div>
        </form>
      </div>
    </header>
  );
};
