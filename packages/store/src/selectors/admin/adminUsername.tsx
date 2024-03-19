import { adminState } from "../../atoms/admin/admin";
import { selector } from "recoil";

export const adminUsername = selector({
  key: "adminUsernameSelector",
  get: ({ get }) => {
    const state = get(adminState);
    return state.username;
  },
});
