"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

interface PaginationProps<T> {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  result: T[];
}

export const Pagination = <T extends unknown>({
  pageIndex,
  perPage,
  totalCount,
  result,
}: PaginationProps<T>) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const search = useSearchParams().get("search");
  const categories = useSearchParams().get("categories");

  const handlePaginationChange = (page: number) => {
    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }
    if (categories) {
      params.set("categories", categories);
    }

    push(`${pathname}?${params.toString()}&page=${page + 1}`)
  };

  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <>
      {result && (
        <div className="mb-12">
          <div className="flex items-center justify-center md:justify-between">
            <span className="hidden text-sm text-muted-foreground md:flex">
              Total de {totalCount} item(s)
            </span>
            <div className="flex items-center  gap-6 lg:gap-8">
              <div className=" text-sm font-medium ">
                Página {pageIndex + 1} de {pages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => handlePaginationChange(0)}
                  disabled={pageIndex === 0}
                >
                  <ChevronsLeft className="h-4 w-4" />
                  <span className="sr-only">Primeira página</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  disabled={pageIndex === 0}
                  onClick={() => handlePaginationChange(pageIndex - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Primeira anterior</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  disabled={pageIndex === pages - 1}
                  onClick={() => handlePaginationChange(pageIndex + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Próxima página</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => handlePaginationChange(pages - 1)}
                  disabled={pageIndex === pages - 1}
                >
                  <ChevronsRight className="h-4 w-4" />
                  <span className="sr-only">Última página</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
