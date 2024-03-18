import React from "react";
import { Button, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  adminUserName,
  adminState,
  isAdminLoading,
  isUserLoading,
  userEmailState,
  userState,
} from "store";

function AdminAppBar() {
  const router = useRouter();
  const adminLoading = useRecoilValue(isAdminLoading);
  const setAdmin = useSetRecoilState(adminState);
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
              {/* <Button
                // variant={"contained"}
                onClick={() => {
                    openAdminLoginModal();
                }}
                >
                Admin Login
            </Button> */}
              {/* <AdminModal
                open={modalOpen}
                onClose={handleCloseModal}
                onSubmit={handleAdminSubmission}
                isSignInRef={isSignInRef}
                onError={onError}
                handleResetError={handleResetError}
            /> */}
            </div>
            <div style={{ marginRight: 10 }}>
              <Button
                variant={"contained"}
                onClick={() => {
                  router.push("/user/signin");
                }}
              >
                Admin appbar
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
        {/* </> */}
    {/* //   ) : null} */}
    </div>
  );
}

export default AdminAppBar;
