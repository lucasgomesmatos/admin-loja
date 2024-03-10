import { create } from 'zustand';

interface ProductStoreState {
  files: File[];
  loading: boolean;
}

interface ProductStoreActions {
  addFiles(files: File[]): void;
  removeFile(file: File): void;
  removeAllFiles(): void;
  setLoading(loading: boolean): void;
}

export const productStore = create<ProductStoreState & ProductStoreActions>(
  (set, get) => {
    return {
      files: [],
      loading: false,
      addFiles: (files) => {
        set({ files: [...get().files, ...files] });
      },
      removeFile: (file) => {
        const files = get().files;
        const newFiles = files.filter((f) => f !== file);

        set({ files: newFiles });
      },
      removeAllFiles: () => {
        set({ files: [] });
      },
      setLoading: (loading: boolean) => {
        set({ loading });
      },
    };
  },
);
