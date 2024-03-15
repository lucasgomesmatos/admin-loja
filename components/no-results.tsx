import { SearchX } from "lucide-react";

export const NoResults = () => {
  return (
    <div className="flex items-center justify-center w-full h-64 ">
      <div className="flex flex-col items-center gap-2">
        <SearchX className="h-10 w-10" />
        <div className="text-sm font-medium">Sem resultados</div>
      </div>
    </div>
  );
};
