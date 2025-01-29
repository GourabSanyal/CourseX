import { atom } from "recoil";
import type { Course } from "shared-types";

export const cartState = atom<Record<string, Course>>({
  key: "cartStateAtom",
  default: {},
});
