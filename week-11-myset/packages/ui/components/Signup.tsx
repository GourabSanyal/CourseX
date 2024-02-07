/* eslint-disable unicorn/filename-case */
import {
  Typography,
  InputAdornment,
  Card,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function Signup(props: {
  onClick: (username: string, email: string, password: string) => void;
  onError: string | undefined;
}): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        <Typography variant="h6">Welcome to Coursera. Sign In below</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: 400, padding: 20 }}>
          <TextField
            fullWidth
            label="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            type="username"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            fullWidth
            label="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={handleTogglePasswordVisibility}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            label="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            type={showPassword ? "text" : "password"}
            variant="outlined"
          />
          <br />
          <br />
          <Button
            onClick={() => {
              props.onClick(username, email, password);
            }}
            size="large"
            variant="contained"
            >
            {" "}
            Sign Up
          </Button>
            {props.onError ? (
              <Typography
                align="center"
                style={{ marginTop: 10, color: "red" }}
                variant="body2"
              >
                {props.onError}
              </Typography>
            ) : null}
        </Card>
      </div>
    </div>
  );
}
