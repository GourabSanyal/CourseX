import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  adminEmailState,
  adminUserName,
  isAdminLoading,
  isUserLoading,
  userEmailState,
} from "store";
import { Grid, Typography, Button } from "@mui/material";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Grid
        container
        style={{
          padding: "5vw",
          flexWrap: "wrap-reverse",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">CourseX</Typography>
            <Typography variant="h5">Learn, earn and grow</Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <img
            src="https://img.freepik.com/free-vector/empty-classroom-interior-with-chalkboard_1308-65378.jpg"
            alt="course-image"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>
      </Grid>
    </div>
  );
}