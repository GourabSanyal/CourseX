/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

"use client";

import { Typography, Card, TextField, Button } from "@mui/material";
import { useState } from "react";

export function Signin(props: {
  onClick: (username: string, password: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to Coursera. Sign In below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            fullWidth
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
          />
          <br />
          <br />

          <Button
            size={"large"}
            variant="contained"
            onClick={() => {
              props.onClick(email, password);
            }}
          >
            {" "}
            Sign In
          </Button>
        </Card>
      </div>
    </div>
  );
}
