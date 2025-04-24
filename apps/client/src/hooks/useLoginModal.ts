import { useRecoilState } from "recoil";
import { loginModalState } from "store";
import { signIn } from "next-auth/react";
import { useRef } from "react";

interface LoginModalState {
  isOpen: boolean;
  error: string | null;
  isAdminModalOpen: boolean;
}

export const useLoginModal = () => {
  const [modalState, setModalState] = useRecoilState<LoginModalState>(loginModalState);
  const isSignInRef = useRef(true);

  const openLoginModal = () => {
    setModalState((prev: LoginModalState) => ({ ...prev, isOpen: true }));
  };

  const closeLoginModal = () => {
    setModalState((prev: LoginModalState) => ({ ...prev, isOpen: false, error: null }));
  };

  const openAdminModal = () => {
    setModalState((prev: LoginModalState) => ({ ...prev, isAdminModalOpen: true }));
  };

  const closeAdminModal = () => {
    setModalState((prev: LoginModalState) => ({ ...prev, isAdminModalOpen: false, error: null }));
  };

  const setError = (error: string | null) => {
    setModalState((prev: LoginModalState) => ({ ...prev, error }));
  };

  const handleAdminSubmission = async (
    username: string | null | undefined,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      if (isSignInRef.current) {
        const result = await signIn("admin-signin", {
          email,
          password,
          callbackUrl: "/admin/dashboard",
        });

        if (result?.error) {
          const checkUserExists = await fetch("/api/user/check-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
          const data = await checkUserExists.json();
          setError(data.message);
        }
      } else {
        const result = await signIn("admin-signup", {
          username,
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          const checkUserExists = await fetch("/api/user/check-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
          const data = await checkUserExists.json();
          if (data.errorType === "user_exist") {
            setError("Admin already exists, please login to continue");
          }
        }
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogin = async (role: "admin" | "user") => {
    if (role === "admin") {
      openAdminModal();
    } else {
      await signIn("google", { callbackUrl: "/user/home" });
    }
  };

  return {
    isOpen: modalState.isOpen,
    isAdminModalOpen: modalState.isAdminModalOpen,
    error: modalState.error,
    openLoginModal,
    closeLoginModal,
    openAdminModal,
    closeAdminModal,
    setError,
    handleLogin,
    handleAdminSubmission,
    isSignInRef,
  };
}; 