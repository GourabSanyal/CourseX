import { atom } from "recoil";

type Course = {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
};

const getInitialCartState = (): Course[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cartState");
    return savedCart ? JSON.parse(savedCart) : {};
  }
  return [];
};

export const cartState = atom({
  key: "cartState",
  default: getInitialCartState(),
});
