import { atom } from "recoil";

const getInitialCartState = (): { [key: number]: string } => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cartState");
    return savedCart ? JSON.parse(savedCart) : {};
  }
  return {};
};

export const cartState = atom< {[key: number]:string}>({
  key: "cartState",
  default: getInitialCartState()
});
