"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const SearchUsers = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const query = search.get("search");

  const [text, setText] = useState(query ?? "");
  const filter = useDebounce(2000, text);

  const generateSearchParams = useCallback(() => {
    const params = new URLSearchParams();

    if (filter) {
      params.set('search', filter);
      params.set('page', '1');
    }

    return params;
  }, [filter]);

  const handleSearchAndPagination = useCallback(() => {
    const params = generateSearchParams();
    push(`${pathname}?${params.toString()}`);
  }, [generateSearchParams, push, pathname]);

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
