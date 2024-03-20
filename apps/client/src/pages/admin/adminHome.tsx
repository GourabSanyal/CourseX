import { Box, Grid, Tab, Typography } from "@mui/material";
import { Tabs } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { adminState } from "store";

const adminHome = () => {
  const adminUsername = useRecoilValue(adminState).username;
  return (
    <div
      style={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}
    >
      <div style={{ marginTop: "9vh" }}>
        <Grid xl={2}>
          <Typography variant="h4">
            Welcome {adminUsername}
          </Typography>
          <div style={{ justifyContent: "center", alignItems: 'center' }}>
            <Tabs style={{ marginLeft: "-20px"}}>
              <Tab label="Your courses" />
              <Tab label="All courses" />
            </Tabs>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default adminHome;
