import { atom } from "recoil";

export const adminState = atom({
  key: "adminState",
  default: {
    isLoading: true,
    userEmail: null as string | null | undefined,
    username: null as string | null | undefined,
  },
});
