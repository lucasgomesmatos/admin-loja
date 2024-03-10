'use client';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';
import {
  addFilesAction,
  addIdValueAction,
  addNameValueAction,
  openDialogDeleteProductAction,
  removeAllAction,
  removeFileAction,
} from '../store/actions';
import {
  ProductStoreState,
  initialProductState,
  productReducer,
} from '../store/reducer';

interface ProductContextProps {
  product: ProductStoreState;

  addNameValue: (nameValue: string) => void;
  addIdValue: (idValue: string) => void;
  addFiles: (files: File[]) => void;
  removeFile: (nameFile: string) => void;
  removeAll: () => void;
  dispatch: (value: any) => void;
  openDialogDeleteProduct: (productId: string | null) => void;
}

const ProductContext = createContext<ProductContextProps | null>(null);

export const ProductContextProvider = ({ children }: PropsWithChildren) => {
  const [product, dispatch] = useReducer(productReducer, initialProductState);

  const addNameValue = (nameValue: string) => {
    dispatch(addNameValueAction(nameValue));
  };

  const addIdValue = (idValue: string) => {
    dispatch(addIdValueAction(idValue));
  };

  const addFiles = (files: File[]) => {
    dispatch(addFilesAction(files));
  };

  const removeFile = (nameFile: string) => {
    dispatch(removeFileAction(nameFile));
  };

  const removeAll = () => {
    dispatch(removeAllAction());
  };

  const openDialogDeleteProduct = (productId: string | null) => {
    console.log(
      'openDialogDeleteProductAction',
      product.dialogDeleteProductOpen,
    );
    dispatch(openDialogDeleteProductAction(productId));
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        addNameValue,
        addIdValue,
        addFiles,
        removeFile,
        removeAll,
        dispatch,
        openDialogDeleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useContext deve estar dentro do Provider');
  return context;
};
