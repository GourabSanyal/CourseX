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
  onClick: (username: string, email: string, password: string) => void;
  onError?: string | null | undefined;
}
interface FormData {
  username: string;
  email: string;
  password: string;
}

export function Signup({ onError }: SignupProps): JSX.Element {
  // const userLoading = useRecoilValue(isUserLoading);
  // const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);
  const [showPassword, setShowPassword] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const handleUserSignUp = async(username: string, email: string, password: string) => {
    const response = await axios.post("/api/auth/user/signup", {
      username, email, password
    })
    localStorage.setItem("token", response.data.token);
    setUser({ isLoading : false, userEmail: email})
    router
  }

  const onSubmit: SubmitHandler<FormData> = async(data) => {
    try {
      await handleUserSignUp(data.username, data.email, data.password)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        setSubmissionError(error.response.data.message)
      }
    }
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+$/,
                  message: "Invalid username",
                },
              })}
              error={!!errors.username}
              helperText={errors.email?.message}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              required
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 10,
                  message: "Password must be at least 10 characters long",
                },
                pattern: {
                  value: /\d+/gi,
                  message: "Password must contain at least one number",
                },
              })}
              error={!!errors.password}
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
              <Typography
                variant="body2"
                align="center"
                style={{ color: "red" }}
              >
                {submissionError}
              </Typography>
            <br />
            <Button type="submit" size="large" variant="contained">
              Signup
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
