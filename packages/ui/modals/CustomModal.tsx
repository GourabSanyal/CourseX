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
  Grid,
} from "@mui/material";
import { Button as AppButton } from "../Button";

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
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
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
          <Button onClick={onClose} style={{ marginLeft: "auto" }}>
            X
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          justifyContent="space-around"
          display="flex"
          flexWrap="wrap"
          margin="0.5rem"
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Login As Admin
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Login As User
              </Button>
            </Grid>
          </Grid>
        </Box>

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
