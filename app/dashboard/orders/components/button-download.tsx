"use client";

import { Button } from "@/components/ui/button";
import { downloadFile } from "@/utils/functions/download-file";
import { FileContent } from "@/utils/types/file-content";
import { Download } from "lucide-react";
import { useState } from "react";

interface ButtonDownloadProps {
  file: FileContent;
  cpf: string;
  name: string;
}

export const ButtonDownload = ({ file, cpf, name }: ButtonDownloadProps) => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    setLoading((prev) => !prev);
  };

  return (
    <Button
      loading={loading}
      title="Baixar"
      onClick={() =>
        downloadFile({
          fileName: file.name,
          url: file.url,
          cpfUser: cpf,
          nameUser: name,
          setLoading: toggleLoading,
        })
      }
      className="w-full flex gap-2"
    >
      {loading ? (
        "Baixando..."
      ) : (
        <>
          Baixar
          <Download className="size-4" />
        </>
      )}
    </Button>
  );
};
