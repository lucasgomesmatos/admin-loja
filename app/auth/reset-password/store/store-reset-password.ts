import { create } from "zustand";

interface ResetPasswordState {
  passwordValue: string | null;
  confirmationPasswordValue: string | null;
}

interface ResetPasswordActions {
  reset: () => void;
  addPasswordValueAction: (passwordValue: string) => void;
  addConfirmationPasswordValueAction: (
    confirmationPasswordValue: string
  ) => void;
}

export const useResetPassword = create<
  ResetPasswordState & ResetPasswordActions
>((set) => ({
  passwordValue: null,
  confirmationPasswordValue: null,

  addPasswordValueAction: (passwordValue) => {
    set({ passwordValue });
  },
  addConfirmationPasswordValueAction(confirmationPasswordValue) {
    set({ confirmationPasswordValue });
  },

  reset: () => {
    set({
      passwordValue: null,
      confirmationPasswordValue: null,
    });
  },
}));
