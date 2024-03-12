"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchCategories = () => {
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
            />
          </div>
        </form>
      </div>
    </header>
  );
};
