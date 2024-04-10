"use client";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export const Loading = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {
        pending && (<div className="fixed left-0 top-0 z-50 flex min-h-screen w-full flex-col items-center justify-center gap-2 ">
          <span>
            <Loader2 className="size-8 animate-spin" />
          </span>
          <div className="text-sm text-gray-500 dark:text-gray-400">Carregando...</div>
        </div>)
      }
    </>
  )
}
