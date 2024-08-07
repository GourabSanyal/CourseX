import { atom } from "recoil";
export const userState = atom({
  key: "userState",
  default: {
    isLoading: true,
    userEmail: null as string | null | undefined,
    username: null as string | null | undefined,
  },
});
