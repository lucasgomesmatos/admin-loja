import { FileContent } from '@/utils/types/file-content';
import { create } from 'zustand';

interface ProductStoreState {
  productId: string | null;
  productName: string | null;
  productFiles: File[];
  dialogDeleteProductOpen: {
    open: boolean;
    productId: string | null;
  };
  currentProductFiles: FileContent[];

  productFilesDelete: FileContent[];
}

interface ProductStoreActions {
  addProductNameValueAction: (nameValue: string) => void;
  addProductIdValueAction: (idValue: string) => void;
  addProductFilesAction: (files: File[]) => void;
  removeProductFileAction: (nameFile: string) => void;
  openDialogDeleteProductAction: (productId: string | null) => void;

  setProductCurrentFilesAction: (files: FileContent[]) => void;
  removeProductCurrentFileAction: (file: FileContent) => void;

  reset: () => void;
  resetUpdate: () => void;
  resetOnLoad: () => void;
}

export const useProductStore = create<ProductStoreState & ProductStoreActions>(
  (set) => ({
    productId: null,
    productName: null,
    productFiles: [],
    dialogDeleteProductOpen: {
      open: false,
      productId: null,
    },
    currentProductFiles: [],
    productFilesDelete: [],

    addProductNameValueAction: (nameValue: string) => {
      set({ productName: nameValue });
    },

    addProductIdValueAction: (idValue: string) => {
      set({ productId: idValue.replace(/\D/g, '') });
    },

    addProductFilesAction: (files: File[]) => {
      set((state) => ({
        productFiles: [
          ...Array.from(new Set([...state.productFiles, ...files])),
        ],
      }));
    },

    removeProductFileAction: (nameFile: string) => {
      set((state) => ({
        productFiles: state.productFiles.filter(
          (item) => item.name !== nameFile,
        ),
      }));
    },

    openDialogDeleteProductAction: (productId: string | null) => {
      set((state) => ({
        dialogDeleteProductOpen: {
          open: !state.dialogDeleteProductOpen.open,
          productId,
        },
      }));
    },

    setProductCurrentFilesAction: (files: FileContent[]) => {
      const setFiles = new Set(files);

      set({ currentProductFiles: Array.from(setFiles) });
    },

    removeProductCurrentFileAction: (file: FileContent) => {
      set((state) => ({
        currentProductFiles: state.currentProductFiles.filter(
          (item) => item.id !== file.id,
        ),

        productFilesDelete: [...state.productFilesDelete, file],
      }));
    },

    reset: () => {
      set({
        productId: null,
        productName: null,
        productFiles: [],
      });
    },

    resetUpdate: () => {
      set({
        productId: null,
        productName: null,
        productFiles: [],
        productFilesDelete: [],
        currentProductFiles: [],
      });
    },

    resetOnLoad: () => {
      set({
        productId: null,
        productName: null,
        productFiles: [],
        productFilesDelete: [],
        currentProductFiles: [],
      });
    },
  }),
);
