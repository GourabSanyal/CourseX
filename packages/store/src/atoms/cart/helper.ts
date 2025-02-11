export const saveCartToLocalStorage = (cart: any) => {
    // if (typeof window !== "undefined") {

    console.log("saved cart funciton -> ", cart, (typeof cart));
    
      localStorage.setItem("cartState", JSON.stringify(cart));


    // }
  };