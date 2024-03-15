import { create } from "zustand";

interface CategoryStoreState {
  dialogCreateCategoryOpen: {
    open: boolean;
  };
  dialogUpdateCategoryOpen: {
    open: boolean;
    nameCategory: string | null;
    categoryId: string | null;
  };
  dialogDeleteCategoryOpen: {
    open: boolean;
    nameCategory: string | null;
    categoryId: string | null;
  };

  categoryNameValue: string | null;
}

interface CategoryStoreActions {
  openDialogCreateCategoryAction: (open: boolean) => void;
  openDialogUpdateCategoryAction: (
    nameCategory: string | null,
    categoryId: string | null
  ) => void;
  openDialogDeleteCategoryAction: (
    nameCategory: string | null,
    categoryId: string | null
  ) => void;
  addCategoryNameValueAction: (nameValue: string) => void;
}

export const useCategoryStore = create<
  CategoryStoreState & CategoryStoreActions
>((set) => ({
  dialogCreateCategoryOpen: {
    open: false,
  },
  dialogUpdateCategoryOpen: {
    open: false,
    nameCategory: null,
    categoryId: null,
  },

  categoryNameValue: null,

  dialogDeleteCategoryOpen: {
    open: false,
    nameCategory: null,
    categoryId: null,
  },
  openDialogCreateCategoryAction: (open) => {
    set({
      dialogCreateCategoryOpen: {
        open: open,
      },
      categoryNameValue: null,
    });
  },

  openDialogUpdateCategoryAction: (nameCategory, categoryId) => {
    set((state) => ({
      dialogUpdateCategoryOpen: {
        open: !state.dialogUpdateCategoryOpen.open,
        nameCategory: nameCategory,
        categoryId: categoryId,
      },
    }));

    set({ categoryNameValue: nameCategory });
  },
  openDialogDeleteCategoryAction: (nameCategory, categoryId) => {
    set((state) => ({
      dialogDeleteCategoryOpen: {
        open: !state.dialogDeleteCategoryOpen.open,
        categoryId: categoryId,
        nameCategory: nameCategory,
      },
    }));
  },
  addCategoryNameValueAction: (nameValue: string) => {
    set({ categoryNameValue: nameValue });
  },
}));
