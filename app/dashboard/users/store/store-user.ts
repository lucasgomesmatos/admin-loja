import { create } from "zustand";

interface UserStoreState {
  dialogCreateUserOpen: {
    open: boolean;
  };
  dialogUpdateUserOpen: {
    open: boolean;
    nameUser: string | null;
    userId: string | null;
  };
  dialogDeleteUserOpen: {
    open: boolean;
    nameUser: string | null;
    userId: string | null;
  };

  userNameValue: string | null;
  userEmailValue: string | null;
  userCpfValue: string | null;
}

interface UserStoreActions {
  openDialogCreateUserAction: (open: boolean) => void;
  openDialogUpdateUserAction: (
    nameUser: string | null,
    userId: string | null
  ) => void;
  openDialogDeleteUserAction: (
    nameUser: string | null,
    userId: string | null
  ) => void;
  addUserNameValueAction: (nameValue: string) => void;
  addUserEmailValueAction: (emailValue: string) => void;
  addUserCpfValueAction: (cpfValue: string) => void;
}

export const useUserStore = create<UserStoreState & UserStoreActions>(
  (set) => ({
    dialogCreateUserOpen: {
      open: false,
    },
    dialogUpdateUserOpen: {
      open: false,
      nameUser: null,
      userId: null,
    },

    userNameValue: null,
    userEmailValue: null,
    userCpfValue: null,

    dialogDeleteUserOpen: {
      open: false,
      nameUser: null,
      userId: null,
    },
    openDialogCreateUserAction: (open) => {
      set({
        dialogCreateUserOpen: {
          open: open,
        },
        userNameValue: null,
      });
    },

    openDialogUpdateUserAction: (nameUser, userId) => {
      set((state) => ({
        dialogUpdateUserOpen: {
          open: !state.dialogUpdateUserOpen.open,
          nameUser: nameUser,
          userId: userId,
        },
      }));

      set({ userNameValue: nameUser });
    },
    openDialogDeleteUserAction: (nameUser, userId) => {
      set((state) => ({
        dialogDeleteUserOpen: {
          open: !state.dialogDeleteUserOpen.open,
          userId: userId,
          nameUser: nameUser,
        },
      }));
    },
    addUserNameValueAction: (nameValue: string) => {
      set({ userNameValue: nameValue });
    },
    addUserEmailValueAction: (emailValue) => {
      set({ userEmailValue: emailValue });
    },
    addUserCpfValueAction: (cpfValue) => {
      if (cpfValue.length > 14) return;

      const newCpfValue = cpfValue
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      set({ userCpfValue: newCpfValue });
    },
  })
);
