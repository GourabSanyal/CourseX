
export const saveCartToLocalStorage = (cart: { [key: number]: string }) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartState", JSON.stringify(cart));
    }
  };