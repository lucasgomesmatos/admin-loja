export enum ProductActionType {
  ADD_NAME = 'ADD_NAME',
  ADD_ID = 'ADD_ID',
  RESET_ALL = 'RESET_ALL',
  ADD_FILES = 'ADD_FILES',
  REMOVE_FILE = 'REMOVE_FILE',
  OPEN_DIALOG_DELETE_PRODUCT = 'OPEN_DIALOG_DELETE_PRODUCT',
}

export type ProductState = {
  id: number;
  name: string;
  files: File[];
  loading: boolean;
};

export function addNameValueAction(nameValue: string) {
  return {
    type: ProductActionType.ADD_NAME,
    payload: {
      nameValue,
    },
  };
}

export function addIdValueAction(idValue: string) {
  return {
    type: ProductActionType.ADD_ID,
    payload: {
      idValue,
    },
  };
}

export function addFilesAction(files: File[]) {
  return {
    type: ProductActionType.ADD_FILES,
    payload: {
      files,
    },
  };
}

export function removeFileAction(nameFile: string) {
  return {
    type: ProductActionType.REMOVE_FILE,
    payload: {
      nameFile,
    },
  };
}

export function openDialogDeleteProductAction(productId: string | null) {
  return {
    type: ProductActionType.OPEN_DIALOG_DELETE_PRODUCT,
    payload: {
      productId,
    },
  };
}

export function removeAllAction() {
  return {
    type: ProductActionType.RESET_ALL,
  };
}
