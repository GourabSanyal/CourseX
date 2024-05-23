import { atom } from "recoil";
// import {persistAtom} from '../../storage/recoil-persist';

export const adminState = atom({
  key: "adminState",
  default: {
    isLoading: true,
    userEmail: null as string | null,
    username: null as string | null | undefined,
  },
  // effects_UNSTABLE : [persistAtom]
});
