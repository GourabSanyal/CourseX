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

import React, { useEffect, useState, useCallback } from "react";
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
  useTheme,
  useMediaQuery,
  Box,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Close as CloseIcon } from "@mui/icons-material";
import { useForm, SubmitHandler } from "react-hook-form";

interface AdminModalProps {
  open: boolean;
  onClose?: () => void;
  onSubmit: (
    username: string | null | undefined,
    email: string,
    password: string
  ) => Promise<void>;
  isSignInRef: React.MutableRefObject<boolean>;
  onError?: string | null | undefined;
  handleResetError?: () => void;
}
interface FormData {
  username?: string | undefined;
  email: string;
  password: string;
}

export function AdminModal({
  open,
  onClose,
  onSubmit,
  isSignInRef,
  onError,
  handleResetError,
}: AdminModalProps): JSX.Element {
  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const { errors, touchedFields } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const [rerenderFlag, setRerenderFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleToggleForm = useCallback(() => {
    reset({
      username: '',
      email: '',
      password: '',
    }, {
      keepErrors: false,
      keepDirty: false,
      keepIsSubmitted: false,
      keepTouched: false,
      keepIsValid: false,
      keepSubmitCount: false,
    });
    isSignInRef.current = !isSignInRef.current;
    setRerenderFlag(!rerenderFlag);
    if (handleResetError) {
      handleResetError();
    }
  }, [handleResetError, isSignInRef, rerenderFlag, reset]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);
      if (isSignInRef.current) {
        await onSubmit(null, data.email, data.password);
      } else {
        await onSubmit(data.username, data.email, data.password);
      }
    } catch (error) {
      if (error) {
        console.log("error from modal ->", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={isMobile}
      maxWidth={isMobile ? "xs" : "sm"}
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: { xs: 1, sm: 2 },
        }
      }}
    >
      <DialogTitle sx={{ p: 2, pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography 
              variant="h5" 
              component="h2"
              sx={{ 
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 0.5
              }}
            >
              {isSignInRef.current ? "Admin Sign In" : "Admin Sign Up"}
            </Typography>
            <Typography 
              variant="subtitle1" 
              component="h3"
              sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 400
              }}
            >
              {isSignInRef.current 
                ? "Sign in to access admin features" 
                : "Create a new admin account"}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                color: theme.palette.text.primary,
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 2, pt: 1 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ mt: 2 }}
        >
          {!isSignInRef.current && (
            <TextField
              label="Username"
              fullWidth
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+$/,
                  message: "Invalid username",
                },
              })}
              error={!!errors.username && touchedFields.username}
              helperText={touchedFields.username ? errors.username?.message : ''}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                },
              }}
            />
          )}
          <TextField
            label="Email"
            fullWidth
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email && touchedFields.email}
            helperText={touchedFields.email ? errors.email?.message : ''}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              },
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
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
            error={!!errors.password && touchedFields.password}
            helperText={touchedFields.password ? errors.password?.message : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{
              py: 1.5,
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              borderRadius: 1,
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: theme.shadows[4],
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              isSignInRef.current ? "Sign In" : "Sign Up"
            )}
          </Button>

          {onError && (
            <Typography
              variant="body2"
              align="center"
              sx={{
                color: theme.palette.error.main,
                mt: 1,
                fontWeight: 500,
              }}
            >
              {onError}
            </Typography>
          )}

          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              color: theme.palette.text.secondary,
              mt: 1,
            }}
          >
            {isSignInRef.current
              ? "Don't have an admin account? "
              : "Already have an admin account? "}
            <Link 
              component="button" 
              variant="body2" 
              onClick={handleToggleForm}
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {isSignInRef.current ? "Register as an Admin here" : "Sign In here"}
            </Link>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}