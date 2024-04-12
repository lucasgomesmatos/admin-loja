"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Ban } from "lucide-react"
import Link from "next/link"


export default function NotFound() {
  return (
    <div className="flex w-full h-screen items-center justify-center flex-col gap-6">
      <h1 className="flex gap-4 text-2xl flex-col items-center font-bold">
        <Ban className="size-11" />  404 - Página não encontrada!
      </h1>
      <Link href="/">
        <Button className="gap-4" variant="outline">
          <ArrowLeft className="size-4" />
          Ir para a página inicial</Button>
      </Link>
    </div>
  )
}
