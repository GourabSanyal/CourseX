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
import { useSetRecoilState } from "recoil";
import { adminState } from "store";
import { ensureDbConnected } from "@/lib/dbConnect";

const UnAuthenticatedAppBar = () => {
  //admin state
  const setAdmin = useSetRecoilState(adminState);
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
  // const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false); // closes admin modal
    setLoginModalOpen(false); // closes users modal
  };

  const adminLogin = () => {
    console.log("admin login");
    signIn("credentials", { role: "admin" });
  };
  const adminLogout = () => {
    console.log("admin logout");
    signOut();
  };
  const userLogin = () => {
    console.log("user login");
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
      const response = await axios.post("api/auth/admin/signup", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      router.push("/admin/dashboard");
      setAdmin({ isLoading: false, userEmail: email, username: username });
      handleCloseModal();
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
      await signIn("admin-signin", {
        role: role as string,
        callbackUrl: `http://localhost:3000/`,
      });
    }
  };

  const adminSignIn = async (email: string, password: string) => {
    try {
      // const response = await axios.post("api/auth/admin/signin", {
      //   email,
      //   password,
      // });
      // localStorage.setItem("token", response.data.token);

      // handleCloseModal();
      // router.push("/admin/dashboard");
      // let username = response.data.username;
      // setAdmin({ isLoading: false, userEmail: email, username: username });
      // console.log("cred email", email , password);
      // ensureDbConnected()
      const results=  await signIn("admin-signin", { email, password, redirect: false})
      if (results?.error === "CredentialsSignin"){
        setOnError("No admin found with this given email")
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
        // console.log("cred", email, password);
        
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
            <MenuItem
              onClick={() => {
                openAdminLoginModal();
              }}
            >
              Admin Login
            </MenuItem>
            <MenuItem onClick={adminLogout}>SignIn</MenuItem>
            <MenuItem
              onClick={() => {
                router.push("/user/signin");
              }}
            >
              SignUp
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
          <div style={{ marginRight: 10 }}>
            <Button
              style={{ color: "white" }}
              onClick={() => {
                openAdminLoginModal();
              }}
            >
              Admin Login
            </Button>
          </div>
          <div style={{ marginRight: 10 }}>
            <Button
              variant={"contained"}
              onClick={() => {
                router.push("/user/signin");
              }}
            >
              Sign In
            </Button>
          </div>
          <div>
            <Button
              variant={"contained"}
              onClick={() => {
                router.push("/user/signup");
              }}
            >
              Sign Up
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
