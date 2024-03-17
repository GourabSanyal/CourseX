import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist({
//   key: 'persist',
//   storage: localStorage,
//   converter: JSON
// })

export const userState = atom({
  key: "userState",
  default: {
    isLoading: true,
    userEmail: null as string | null,
    username: null as string | null,
  },
  // effects_UNSTABLE: [persistAtom]
});
