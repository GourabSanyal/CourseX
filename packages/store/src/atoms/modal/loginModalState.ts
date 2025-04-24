import { atom } from "recoil";

interface LoginModalState {
  isOpen: boolean;
  error: string | null;
  isAdminModalOpen: boolean;
}

export const loginModalState = atom<LoginModalState>({
  key: "loginModalState",
  default: {
    isOpen: false,
    error: null,
    isAdminModalOpen: false,
  },
}); 