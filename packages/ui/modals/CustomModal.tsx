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

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Box,
} from "@mui/material";

interface CustomModalProps {
  open: boolean;
  onClose?: () => void;
  onError?: string | null | undefined;
  heading: string;
  subHeading: string;
}

export function CustomModal({
  open,
  onClose,
  onError,
  heading,
  subHeading,
}: CustomModalProps): JSX.Element {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" component="h2">
              {heading}
            </Typography>
            <Typography variant="subtitle1" component="h3" gutterBottom>
              {subHeading}
            </Typography>
          </Box>
          <Button onClick={onClose} style={{ marginLeft: 'auto' }}>
            X
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {onError ? (
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: 10, color: "red" }}
          >
            {onError}
          </Typography>
        ) : null}
        {/* Other content can go here */}
      </DialogContent>
    </Dialog>
  );
}





// {/* <Typography variant="body2" align="center" style={{ marginTop: 10 }}>
//           {isSignInRef.current
//             ? "Don't have an admin account? "
//             : "Already have an admin account? "}
//           <Link component="button" variant="body2" onClick={handleToggleForm}>
//             {isSignInRef.current ? "Register as an Admin here" : "Sign In here"}
//           </Link>
//         </Typography> */}