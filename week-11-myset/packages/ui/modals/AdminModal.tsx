/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/no-extraneous-dependencies */
// components/AdminModal.js

// components/AdminModal.js
import React, { useState } from "react";
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

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string, password: string,  confirmPassword?: string) => void;
  isSignInRef: React.MutableRefObject<boolean>;
}

export function AdminModal({
  open,
  onClose,
  onSubmit,
  isSignInRef,
}: AdminModalProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rerenderFlag, setRerenderFlag] = useState(false);

  const handleToggleForm = () => {
    setEmail('')
    setPassword('')
    isSignInRef.current = !isSignInRef.current;
    setRerenderFlag(!rerenderFlag); 
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {isSignInRef.current ? "Admin Sign In" : "Admin Sign Up"}
        <Button
          onClick={onClose}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          X
        </Button>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
