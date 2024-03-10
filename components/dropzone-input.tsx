'use client';

import { useProductContext } from '@/app/dashboard/products/context/product-context';
import { formatBytes } from '@/utils/functions/format-bytes';
import { FileIcon, Trash2, UploadCloud } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DropzoneInput() {
  const {
    addFiles,
    removeFile,
    product: { files },
  } = useProductContext();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      addFiles(acceptedFiles);
    },
    [addFiles],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  return (
    <>
      <section
        className=" rounded-lg border-dashed border-2 border-gray-400 p-4
    hover:border-gray-600 bg-gray-50  transition-all duration-300 ease-in-out"
      >
        <div {...getRootProps()} className="cursor-pointer">
          <input {...getInputProps()} />
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm text-gray-400">
              <span className="font-bold mr-1">Clique para enviar</span>
              ou arraste e solte arquivos aqui
            </p>
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <FileIcon className="size-4" />
              PDF
            </p>
          </div>
        </div>
      </section>
      {Boolean(files.length) && (
        <div className="mt-4">
          <h2>Arquivos:</h2>
          <div className="mt-2 flex flex-col gap-3 w-full ">
            {files?.map((file) => (
              <div
                className="flex group items-start gap-4 rounded-lg border border-zinc-200 p-4"
                key={file.name}
              >
                <div className="rounded-full border-4 border-purple-100 bg-purple-200 p-2 text-purple-600">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <div className="flex flex-1 flex-col items-start gap-1">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-700">
                      {file.name}
                    </span>
                    <span className="text-sm font-medium text-zinc-500">
                      {formatBytes(file.size)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.name)}
                  type="button"
                  className="ml-auto rounded-md p-2 hover:bg-zinc-50"
                >
                  <Trash2 className="h-5 w-5 text-zinc-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
