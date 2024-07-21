import { atom } from "recoil";
// import { persistAtom } from "../storage/recoil-persist";

// const { persistAtom } = recoilPersist({
//   key: 'persist',
//   storage: localStorage,
//   converter: JSON
// })

export const userState = atom({
  key: "userState",
  default: {
    isLoading: true,
    userEmail: null as string | null | undefined,
    username: null as string | null | undefined,
  },
  // effects_UNSTABLE: [persistAtom]
});
