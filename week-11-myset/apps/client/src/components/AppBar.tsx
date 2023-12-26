import { Button, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading, userEmailState, userState } from "store";
import { useRouter } from "next/navigation";
import { AdminModal } from "ui";
import axios from "axios";

function Appbar() {
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const isSignInRef = useRef(true);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const adminSignIn = async(email: string, password: string) => {
    const response = await axios.post("api/auth/admin/signin", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    router.push("/user/allCoursePage");
  }

  const adminSignUp = async(email: string, password: string) => {
    const response = await axios.post("api/auth/admin/signup", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    router.push("/user/allCoursePage");
  }
  
  const handleAdminModalSubmit = (email: string, password: string) => {
    if (isSignInRef.current) {
      adminSignIn(email, password);
      console.log(`Sign In:${isSignInRef.current}`, email, password);
    } else {
      adminSignUp(email, password)
      console.log(`Sign Up:${isSignInRef.current}`, email, password);
    }

    // Optionally, close the modal after submission
    // handleCloseModal();
  };

  const openAdminLoginModal = () => {
    setModalOpen(true);
  };
  const closeAdminLoginModal = () => {
    setModalOpen(false);
  };

  if (userLoading) {
    return <></>;
  }

  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div
          style={{
            marginLeft: 10,
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        >
          <Typography variant={"h6"}>Coursera</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button onClick={() => {}}>Add course</Button>
            </div>

            <div style={{ marginRight: 10 }}>
              <Button
                onClick={() => {
                  router.push("/courses");
                }}
              >
                Courses
              </Button>
            </div>

            <Button
              variant={"contained"}
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("pageRefreshed");
                setUser({
                  isLoading: false,
                  userEmail: null,
                });
                router.push("/");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 4,
        }}
      >
        <div style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          <Typography variant={"h6"}>Coursera</Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              // variant={"contained"}
              onClick={() => {
                openAdminLoginModal();
              }}
            >
              Admin Login
            </Button>
            <AdminModal
              open={modalOpen}
              onClose={handleCloseModal}
              onSubmit={handleAdminModalSubmit}
              isSignInRef={isSignInRef}
            />
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
      </div>
    );
  }
}

export default Appbar;
