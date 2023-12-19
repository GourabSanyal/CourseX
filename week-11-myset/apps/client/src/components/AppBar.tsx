import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading, userEmailState, userState } from "store";
import { useRouter } from "next/navigation";
import { AdminModal } from "ui";

function Appbar() {
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

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
            <AdminModal open={modalOpen} onClose={closeAdminLoginModal} />
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
