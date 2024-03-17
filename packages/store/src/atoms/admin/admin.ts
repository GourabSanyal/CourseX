import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const adminState = atom({
  key: "adminState",
  default: {
    isLoading: true,
    userEmail: null as string | null,
    username: null as string | null,
  },
});
