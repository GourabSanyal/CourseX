import { atom } from "recoil";

export const cartState = atom< {[key: number]:string}>({
  key: "cartState",
  default: {}
});
