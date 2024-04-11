import { Category } from '@/utils/types/category';
import { FileContent } from '@/utils/types/file-content';
import { create } from 'zustand';
import { CheckboxesCategories, generateCheckbox } from './../utils/products-utils';

interface ProductStoreState {
  productId: string | null;
  woocommerceId: string | null;
  productName: string | null;
  productFiles: File[];
  dialogDeleteProductOpen: {
    open: boolean;
    productId: string | null;
  };
  currentProductFiles: FileContent[];
  productFilesDelete: FileContent[];

  checkboxes: CheckboxesCategories[],
  categories: Category[],
}

interface ProductStoreActions {
  addProductNameValueAction: (nameValue: string) => void;
  addProductIdValueAction: (idValue: string) => void;
  addProductWoocommerceIdValueAction: (idValue: string) => void;
  addProductFilesAction: (files: File[]) => void;
  removeProductFileAction: (nameFile: string) => void;
  openDialogDeleteProductAction: (productId: string | null) => void;

  setProductCurrentFilesAction: (files: FileContent[]) => void;
  removeProductCurrentFileAction: (file: FileContent) => void;

  generateCheckboxes: (categories: Category[], checked?: boolean, categoriesChecked?: Category[]) => void;
  addCheckboxAction: (id: string) => void;

  reset: () => void;
  resetUpdate: () => void;
  resetOnLoad: () => void;
}

export const useProductStore = create<ProductStoreState & ProductStoreActions>(
  (set, get) => ({
    productId: null,
    woocommerceId: null,
    productName: null,
    productFiles: [],
    dialogDeleteProductOpen: {
      open: false,
      productId: null,
    },
    currentProductFiles: [],
    productFilesDelete: [],

    checkboxes: [],
    categories: [],

    generateCheckboxes(categories, checked, categoriesChecked) {
      const checkboxes = generateCheckbox({ categories, checked, categoriesChecked });
      set({ checkboxes });
    },

    addCheckboxAction: (id) => {
      const { checkboxes } = get();

      const newCheckboxes = checkboxes.map((checkbox) => {
        if (checkbox.id === id) {
          return {
            ...checkbox,
            checked: !checkbox.checked,
          };
        }
        return checkbox;
      })

      set({ checkboxes: newCheckboxes });
    },

    addProductNameValueAction: (nameValue: string) => {
      set({ productName: nameValue });
    },

    addProductIdValueAction: (idValue: string) => {
      set({ productId: idValue.replace(/\D/g, '') });
    },

    addProductWoocommerceIdValueAction: (idValue: string) => {
      set({ woocommerceId: idValue.replace(/\D/g, '') });
    },

    addProductFilesAction: (files: File[]) => {
      set((state) => ({ productFiles: [...state.productFiles, ...files,] }));
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
      set({ currentProductFiles: files });
    },

    removeProductCurrentFileAction: (file: FileContent) => {
      const { currentProductFiles } = get();

      const newFiles = currentProductFiles.filter(
        (item) => item.id !== file.id,
      );

      set({ currentProductFiles: newFiles });
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
        woocommerceId: null,
        productFiles: [],
        productFilesDelete: [],
        currentProductFiles: [],
      });
    },
  }),
);
