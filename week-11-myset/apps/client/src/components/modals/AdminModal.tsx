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
} from "@mui/material";
import { PropTypes } from "@mui/material";

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ open, onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleToggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login or signup logic here
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {isSignIn ? "Admin Sign In" : "Admin Sign Up"}
        <Button
          onClick={onClose}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          X
        </Button>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" fullWidth margin="normal" required />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
          />
          {!isSignIn && (
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              required
            />
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: 10 }}>
          {isSignIn
            ? "Don't have an admin account? "
            : "Already have an admin account? "}
          <Link component="button" variant="body2" onClick={handleToggleForm}>
            {isSignIn ? "Register as an Admin here" : "Sign In here"}
          </Link>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default AdminModal;
