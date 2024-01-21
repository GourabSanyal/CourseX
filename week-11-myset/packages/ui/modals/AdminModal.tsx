/* eslint-disable no-implicit-coercion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/no-extraneous-dependencies */
// components/AdminModal.js

// components/AdminModal.js
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, SubmitHandler } from "react-hook-form";
import { red } from "@mui/material/colors";

interface AdminModalProps {
  open: boolean;
  onClose?: () => void;
  onSubmit: (
    email: string,
    password: string,
    confirmPassword?: string
  ) => Promise<void>;
  isSignInRef: React.MutableRefObject<boolean>;
  onError?: string | null;
}
interface FormData {
  email: string;
  password: string;
}

export function AdminModal({
  open,
  onClose,
  onSubmit,
  isSignInRef,
  onError,
}: AdminModalProps): JSX.Element {
  const { register, handleSubmit, formState, reset, setError } = useForm<FormData>();
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const [rerenderFlag, setRerenderFlag] = useState(false);

  const handleToggleForm = () => {
    reset();
    isSignInRef.current = !isSignInRef.current;
    setRerenderFlag(!rerenderFlag);
    // propOnError(null)
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    // await console.log("data -> ", data);
    try {
      await onSubmit(data.email, data.password);
    } catch (error) {
      if (error) {
        console.log("error from modal ->", error);
        
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Button
          onClick={onClose}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          X
        </Button>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isSignInRef.current ? "Sign In" : "Sign Up"}
          </Button>
        </form>
        {onError ?
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: 10, color: "red" }}
          >
            {onError}

          </Typography> : null
        }

        <Typography variant="body2" align="center" style={{ marginTop: 10 }}>
          {isSignInRef.current
            ? "Don't have an admin account? "
            : "Already have an admin account? "}
          <Link component="button" variant="body2" onClick={handleToggleForm}>
            {isSignInRef.current ? "Register as an Admin here" : "Sign In here"}
          </Link>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
