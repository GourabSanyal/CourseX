import { useState, useEffect, useCallback, useRef } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { cartState } from "store";

const DEBOUNCE_DELAY = 10000;

export const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
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
    setTimeout(() => {
      syncWithServer();
    }, DEBOUNCE_DELAY);
  };

  const forceSync = async () => {
    try {
      console.log("fore sync called");
      await syncWithServer();
    } catch (error) {
      console.log("error running forceSync ", error);
    }
  };

  // page unload and navigation debounce
  useEffect(() => {
    const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
      await forceSync();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return {
    cart,
    isLoading,
    error,
    startDebouncedSync,
    syncWithServer,
    forceSync,
  };
};
