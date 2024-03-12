import { create } from "zustand";

interface CategoryStoreState {
  dialogCreateCategoryOpen: {
    open: boolean;
  };
  dialogUpdateCategoryOpen: {
    open: boolean;
    categoryId: string | null;
  };
  dialogDeleteCategoryOpen: {
    open: boolean;
    categoryId: string | null;
  };

  categoryNameValue: string | null;
}

interface CategoryStoreActions {
  openDialogCreateCategoryAction: () => void;
  openDialogUpdateCategoryAction: (categoryId: string | null) => void;
  openDialogDeleteCategoryAction: (categoryId: string | null) => void;
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
    categoryId: null,
  },

  categoryNameValue: null,

  dialogDeleteCategoryOpen: {
    open: false,
    categoryId: null,
  },
  openDialogCreateCategoryAction: () => {
    set((state) => ({
      dialogCreateCategoryOpen: {
        open: !state.dialogCreateCategoryOpen.open,
      },
    }));
  },

  openDialogUpdateCategoryAction: (categoryId: string | null) => {
    set((state) => ({
      dialogUpdateCategoryOpen: {
        open: !state.dialogUpdateCategoryOpen.open,
        categoryId: categoryId,
      },
    }));
  },
  openDialogDeleteCategoryAction: (categoryId: string | null) => {
    set((state) => ({
      dialogDeleteCategoryOpen: {
        open: !state.dialogDeleteCategoryOpen.open,
        categoryId: categoryId,
      },
    }));
  },
  addCategoryNameValueAction: (nameValue: string) => {
    set({ categoryNameValue: nameValue });
  },
}));
