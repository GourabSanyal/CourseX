import React, { useState, useRef, useCallback } from "react";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CustomModal } from "ui";
import { signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu"; // Ensure you have this import
import { AdminModal } from "ui";
import axios from "axios";

const UnAuthenticatedAppBar = () => {
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [onError, setOnError] = useState<string | null>(null);
  const router = useRouter();
  const isSignInRef = useRef(true);

  // responsiveness
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false); // closes admin modal
    setLoginModalOpen(false); // closes users modal
  };

  const adminLogout = () => {
    console.log("admin logout");
    signOut();
  };
  const openAdminLoginModal = () => {
    setModalOpen(true); // OLD - for admin login
  };
  const handleResetError = () => {
    setOnError(null);
  };

  const adminSignUp = async (
    username: string | null | undefined,
    email: string,
    password: string
  ) => {
    try {
      const results = await signIn("admin-signup", {
        username,
        email,
        password,
        callbackUrl: "/admin/dashboard",
      });
      if (results?.error) {
        setOnError("Admin already exists, please login to continue");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        let errorRes = error.response.data.message;
        setOnError(errorRes);
      } else {
        console.log("An error occurred: ", error);
      }
    }
  };

  const openAppLoginModal = () => {
    setLoginModalOpen(true); // NEW - opens oAuth login modal
  };

  const handleLogin = async (role: "admin" | "user") => {
    if (role === "admin") {
      openAdminLoginModal();
    } else {
      await signIn("google", { callbackUrl: "/user/home" }); // user signs in from here
    }
  };

  const adminSignIn = async (email: string, password: string) => {
    try {
      const results = await signIn("admin-signin", {
        email,
        password,
        redirect: false,
      });
      if (results?.error === "CredentialsSignin") {
        // shows a generic credential sign-in error
        // determine the specific error based on our own logic
        const checkUserExists = await fetch("/api/user/check-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await checkUserExists.json();
        console.log("data recieved in clinet ", data);

        if (data) {
          setOnError(data.message);
        }
      }
    } catch (error) {
      setOnError(error as string);
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        let errorRes = error.response.data.message;
        setOnError(errorRes);
      } else {
        console.log("An error occurred: ", error);
      }
    }
  };

  const handleAdminSubmission = async (
    username: string | null | undefined,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      if (isSignInRef.current) {
        adminSignIn(email, password);
      } else {
        adminSignUp(username, email, password);
      }
    } catch (err: any) {
      setOnError(err.message);
    }
  };

  return (
    <>
      {isMobile ? (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          {anchorEl && (
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  openAppLoginModal();
                }}
              >
                Login
              </MenuItem>
            </Menu>
          )}
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              style={{ color: "white" }}
              onClick={() => {
                openAppLoginModal();
              }}
            >
              Login
            </Button>
          </div>
        </div>
      )}
      <CustomModal
        open={loginModalOpen}
        onClose={handleCloseModal}
        heading="Login and start learning"
        subHeading="Start your journey"
        primaryButtonText="Login as Admin"
        primaryButtonSubmit={() => handleLogin("admin")}
        secondaryButtonText="Login As User"
        secondaryButtonSubmit={() => handleLogin("user")}
      />
      <AdminModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAdminSubmission}
        isSignInRef={isSignInRef}
        onError={onError}
        handleResetError={handleResetError}
      />
    </>
  );
};

export default UnAuthenticatedAppBar;
