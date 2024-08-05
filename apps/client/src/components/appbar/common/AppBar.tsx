import React from "react";
import {
  AppBar as Appbar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import UnAuthenticatedAppBar from "./UnAuthenticatedAppBar";
import AdminAppBar from "../admin/AdminAppBar";
import UserAppBar from "../user/UserAppBar";

 export const AppBar : React.FC= () => {
  const [adminAuthenticated, setAdminAuthenticated] = useState<boolean>(false);
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();

  // admin and user authentication
  useEffect(() => {
    if (session.status === "authenticated") {
      if (session.data.user.role === "admin") {
        setAdminAuthenticated(true);
      }
      setUserAuthenticated(true);
    }
  }, [session.status]);

  return (
    <Appbar>
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
          ) : userAuthenticated ? (
            <UserAppBar />
          ) : (
            <UnAuthenticatedAppBar />
          )}
        </div>
      </Toolbar>
    </Appbar>
  );
}

// export default AppBar;
