/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

"use client";

import {
  Typography,
  InputAdornment,
  Card,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "store";

interface SignupProps {
  onSubmit: (username: string, email: string, password: string) => void;
  onError?: string | null | undefined;
}
interface FormData {
  username: string;
  email: string;
  password: string;
}

export function Signup({ onError, onSubmit }: SignupProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const {
    register,
    formState: { errors },
  } = useForm<FormData>();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (data: FormData) => {
    console.log("form submit --> ", data);
  };

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
        <Typography variant="h6">Welcome to Coursera. Sign up below</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: 400, padding: 20 }}>
          <form>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <br />
            <br />
            <TextField
              onChange={(event) => {
                // setEmail(event.target.value);
              }}
              fullWidth
              label="Email"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              onChange={(e) => {
                // setPassword(e.target.value);
              }}
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              // margin="normal"
              // {...register("password", {
              //   required: "Password is required",
              //   minLength: {
              //     value: 10,
              //     message: "Password must be at least 10 characters long",
              //   },
              //   pattern: {
              //     value: /\d+/gi,
              //     message: "Password must contain at least one number",
              //   },
              // })}
              // error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <br />
            <Button type="submit" size="large" variant="contained">
              Signup
            </Button>
            {onError ? (
              <Typography
                variant="body2"
                align="center"
                style={{ color: "red" }}
              >
                {submissionError}
              </Typography>
            ) : null}
          </form>
        </Card>
      </div>
    </div>
  );
}
