import { produce } from 'immer';
import { ProductActionType } from './actions';

export interface ProductStoreState {
  id: string | null;
  name: string | null;
  files: File[];
  dialogDeleteProductOpen: {
    open: boolean;
    productId: string | null;
  };
}

export const initialProductState = {
  id: null,
  name: null,
  files: [],
  dialogDeleteProductOpen: {
    open: false,
    productId: null,
  },
};

export const productReducer = (
  state: ProductStoreState,
  action: any,
): ProductStoreState => {
  switch (action.type) {
    case ProductActionType.ADD_NAME:
      return produce(state, (draft) => {
        draft.name = action.payload.nameValue;
      });
    case ProductActionType.ADD_ID:
      return produce(state, (draft) => {
        draft.id = action.payload.idValue.replace(/\D/g, '');
      });

    case ProductActionType.RESET_ALL:
      return produce(state, (draft) => {
        draft.id = null;
        draft.name = null;
        draft.files = [];
      });
    case ProductActionType.ADD_FILES:
      return produce(state, (draft) => {
        draft.files = [...state.files, ...action.payload.files];
      });

    case ProductActionType.REMOVE_FILE:
      return produce(state, (draft) => {
        draft.files = state.files.filter(
          (item) => item.name !== action.payload.nameFile,
        );
      });

    case ProductActionType.OPEN_DIALOG_DELETE_PRODUCT:
      return produce(state, (draft) => {
        draft.dialogDeleteProductOpen = {
          open: !state.dialogDeleteProductOpen.open,
          productId: action.payload.productId,
        };
      });
    default:
      return state;
  }
};
