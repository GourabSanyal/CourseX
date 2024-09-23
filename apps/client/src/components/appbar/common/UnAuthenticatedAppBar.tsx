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
import MenuIcon from "@mui/icons-material/Menu";
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
    setModalOpen(false); 
    setLoginModalOpen(false); 
  };

  const adminLogout = () => {
    signOut();
  };
  const openAdminLoginModal = () => {
    setModalOpen(true);
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
        redirect: false,
      });

      if (results?.error === "CredentialsSignin") {
        const checkUserExists = await fetch("/api/user/check-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await checkUserExists.json();

        if (data) {
          setOnError("Admin already exist, please login to continue");
        }
      }
    } catch (error: any) {
      setOnError(error);
    }
  };

  const openAppLoginModal = () => {
    setLoginModalOpen(true);
  };

  const handleLogin = async (role: "admin" | "user") => {
    if (role === "admin") {
      openAdminLoginModal();
    } else {
      await signIn("google", { callbackUrl: "/user/home" });
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
        const checkUserExists = await fetch("/api/user/check-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await checkUserExists.json();

        if (data) {
          setOnError(data.message);
        }
      }
    } catch (error: any) {
      setOnError(error)
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
