import React, { useState, useRef, useCallback } from "react";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Typography,
  Box,
} from "@mui/material";
import { CustomModal } from "ui";
import { signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import { AdminModal } from "ui";
import axios from "axios";

const UnAuthenticatedAppBar = () => {
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [onError, setOnError] = useState<string | null>(null);
  const router = useRouter();
  const isSignInRef = useRef(true);
  const theme = useTheme();

  // responsiveness
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
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
        callbackUrl: "/admin/dashboard",
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
      setOnError(error);
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
        <Box>
          <IconButton
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
              },
              p: 1,
            }}
          >
            <MenuIcon 
              sx={{ 
                fontSize: '2rem',
                color: 'primary.main',
              }} 
            />
          </IconButton>
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
            PaperProps={{
              sx: {
                mt: 1.5,
                borderRadius: 2,
                minWidth: 200,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <MenuItem
              onClick={() => {
                openAppLoginModal();
                handleClose();
              }}
              sx={{
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <LoginIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: '1rem',
                }}
              >
                Login
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<LoginIcon />}
            onClick={openAppLoginModal}
            sx={{
              textTransform: 'none',
              borderRadius: '50px',
              px: 3,
              py: 1,
              fontSize: '1rem',
              fontWeight: 500,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            Login
          </Button>
        </Box>
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
