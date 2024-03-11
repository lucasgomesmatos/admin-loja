'use client';

import { useProductStore } from '@/app/dashboard/products/store/store';
import { formatBytes } from '@/utils/functions/format-bytes';
import { FileIcon, LinkIcon, Trash2, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/button';

export default function DropzoneInput() {
  const {
    addProductFilesAction,
    removeProductFileAction,
    productFiles,
    currentProductFiles,
    removeProductCurrentFileAction,
  } = useProductStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      addProductFilesAction(acceptedFiles);
    },
    [addProductFilesAction],
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

      {Boolean(currentProductFiles?.length) && (
        <div className="mt-4">
          <h2 className="text-sm font-bold">
            {currentProductFiles.length === 1
              ? 'Arquivo atual:'
              : 'Arquivos atuais:'}
          </h2>
          <div className="mt-2 flex flex-col gap-3 w-full ">
            {currentProductFiles?.map((file) => (
              <div
                className="flex group items-start gap-4 rounded-lg border border-zinc-200 p-4 "
                key={file.name}
              >
                <div className="rounded-full border-4  p-2 ">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <div className="flex flex-1 flex-col items-start gap-1">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-700 text-ellipsis">
                      {file.name}
                    </span>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => removeProductCurrentFileAction(file)}
                  type="button"
                >
                  <Trash2 className="size-4" />
                </Button>

                <div>
                  <Link href={file.url}>
                    <Button variant="secondary">
                      <LinkIcon className="size-4 text-emerald-950" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {Boolean(productFiles.length) && (
        <div className="mt-4">
          <h2 className="text-sm font-bold">
            {productFiles.length === 1
              ? 'Arquivo a enviar:'
              : 'Arquivos a enviar:'}
          </h2>
          <div className="mt-2 flex flex-col gap-3 w-full ">
            {productFiles?.map((file) => (
              <div
                className="flex group items-start gap-4 rounded-lg border border-zinc-200 p-4 "
                key={file.name}
              >
                <div className="rounded-full border-4  p-2 ">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <div className="flex flex-1 flex-col items-start gap-1">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-700">
                      {file.name}
                    </span>
                    <span className="text-xs font-medium text-zinc-500">
                      {formatBytes(file.size)}
                    </span>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  onClick={() => removeProductFileAction(file.name)}
                  type="button"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
