import { useState, useEffect, useCallback, useRef } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { cartState } from "store";

const DEBOUNCE_DELAY = 10;

export const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)
  const latestCartRef = useRef(cart);

  // update ref if `cart` changes
  useEffect(() => {
    latestCartRef.current = cart;
  }, [cart]);

  // sync cart with server
  const syncWithServer = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await axios.post("/api/user/syncCart", { cart: latestCartRef.current });
    } catch (err) {
      setError("Failed to sync cart with server");
    } finally {
      setIsLoading(false);
    }
  };

  // starts sync with server - debounce
  const startDebouncedSync = () => {
    
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    const newTimeoutId = setTimeout(() => {
      console.log("debounce called");
      
      syncWithServer();
    }, DEBOUNCE_DELAY);
  };

  return {
    cart,
    isLoading,
    error,
    startDebouncedSync,
    syncWithServer,
  };
};
