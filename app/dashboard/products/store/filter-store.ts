import { Category } from "@/utils/types/category";
import { create } from "zustand";
import { CheckboxesCategories, generateCheckbox } from "../utils/products-utils";

interface FilterStoreState {
  checkboxes: CheckboxesCategories[],
  categories: Category[],
}

interface FilterStoreActions {
  generateCheckboxes: (categories: Category[]) => void;
  addCheckboxAction: (id: string) => void;

}

export const useFilterStore = create<FilterStoreState & FilterStoreActions>(
  (set, get) => ({
    checkboxes: [],
    categories: [],


    generateCheckboxes(categories) {
      const checkboxes = generateCheckbox({ categories, checked: false, });
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


      set({ checkboxes: newCheckboxes, });
    },
  }),
);
