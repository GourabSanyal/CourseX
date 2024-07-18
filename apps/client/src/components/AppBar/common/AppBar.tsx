import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading, userEmailState, userState } from "store";
import { adminState, adminEmailState, isAdminLoading } from "store";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import UnAuthenticatedAppBar from "./UnAuthenticatedAppBar";
import AdminAppBar from "../admin/AdminAppBar";
import UserAppBar from "../user/UserAppBar";

function Appbar() {
  // admin state
  const adminLoading = useRecoilValue(isAdminLoading);
  const adminEmail = useRecoilValue(adminEmailState);
  const setAdmin = useSetRecoilState(adminState);
  const [adminAuthenticated, setAdminAuthenticated] = useState<boolean>(false);

  //user state
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);

  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [onError, setOnError] = useState<string | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  //responsivemess mobile logic
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust the breakpoint as needed

  const session = useSession();
  console.log("session ->", session);

  // admin and user authentication
  useEffect(() => {
    if (session.status === "authenticated") {
      if (session.data.user.role === "admin"){
        setAdminAuthenticated(true);
      }
      setUserAuthenticated(true)
    }
  }, [session.status]);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleResetError = () => {
    setOnError(null);
  };

  const isSignInRef = useRef(true);

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleLoginOpenModal = (id: string) => {
    setLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false); // closes admin modal
    setLoginModalOpen(false); // closes users modal
  };

  const adminSignIn = async (email: string, password: string) => {
    try {
      const response = await axios.post("api/auth/admin/signin", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);

      handleCloseModal();
      router.push("/admin/dashboard");
      let username = response.data.username;
      setAdmin({ isLoading: false, userEmail: email, username: username });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        let errorRes = error.response.data.message;
        setOnError(errorRes);
      } else {
        console.log("An error occurred: ", error);
      }
    }
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

  const openAppLoginModal = () => {
    setLoginModalOpen(true); // NEW - opens oAuth login modal
  };

  const openAdminLoginModal = () => {
    setModalOpen(true); // OLD - for admin login
  };
  const closeAdminLoginModal = () => {
    setModalOpen(false);
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

  return (
    <AppBar>
      <Toolbar>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <div onClick={() => router.push("/")}>
            <Typography variant={"h6"}>CourseX</Typography>
          </div>
          {adminAuthenticated ? (
            <AdminAppBar />
          ) : userAuthenticated ? (<UserAppBar/>) :(
            <UnAuthenticatedAppBar />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}