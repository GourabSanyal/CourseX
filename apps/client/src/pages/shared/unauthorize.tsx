import { Typography } from "@mui/material";
import React from "react";

const unauthorize = () => {
  return (
    <Typography
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50vh",
      }}
    >
      You are unauthorize to access this page, please login to continue
    </Typography>
  );
};

export default unauthorize;
