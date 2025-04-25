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

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Box,
  Grid,
  IconButton,
  useTheme,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

interface CustomModalProps {
  open: boolean;
  onClose?: () => void;
  onError?: string | null | undefined;
  heading: string;
  subHeading: string;
  primaryButtonText?: string;
  primaryButtonSubmit?: () => Promise<void>;
  secondaryButtonText?: string;
  secondaryButtonSubmit?: () => Promise<void>;
  loginType?: 'google' | 'admin';
}

export function CustomModal({
  open,
  onClose,
  onError,
  heading,
  subHeading,
  primaryButtonText,
  primaryButtonSubmit,
  secondaryButtonText,
  secondaryButtonSubmit,
  loginType = 'admin',
}: CustomModalProps): JSX.Element {
  const theme = useTheme();
  const [isPrimaryLoading, setIsPrimaryLoading] = useState(false);
  const [isSecondaryLoading, setIsSecondaryLoading] = useState(false);

  const handlePrimaryClick = async () => {
    if (primaryButtonSubmit && !isPrimaryLoading) {
      setIsPrimaryLoading(true);
      try {
        await primaryButtonSubmit();
      } finally {
        setIsPrimaryLoading(false);
      }
    }
  };

  const handleSecondaryClick = async () => {
    if (secondaryButtonSubmit && !isSecondaryLoading) {
      setIsSecondaryLoading(true);
      try {
        await secondaryButtonSubmit();
      } finally {
        setIsSecondaryLoading(false);
      }
    }
  };

  const getLoginIcon = () => {
    switch (loginType) {
      case 'google':
        return <GoogleIcon sx={{ mr: 1 }} />;
      case 'admin':
        return <AdminPanelSettingsIcon sx={{ mr: 1 }} />;
      default:
        return null;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="xs" 
      fullWidth
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
              {heading}
            </Typography>
            <Typography 
              variant="subtitle1" 
              component="h3"
              sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 400
              }}
            >
              {subHeading}
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
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ mt: 2 }}
        >
          <Grid container spacing={2} justifyContent="center">
            {primaryButtonText && (
              <Grid item xs={12} sm={secondaryButtonText ? 6 : 12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handlePrimaryClick}
                  disabled={isPrimaryLoading}
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
                  {isPrimaryLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <>
                      {getLoginIcon()}
                      {primaryButtonText}
                    </>
                  )}
                </Button>
              </Grid>
            )}
            {secondaryButtonText && (
              <Grid item xs={12} sm={primaryButtonText ? 6 : 12}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={handleSecondaryClick}
                  disabled={isSecondaryLoading}
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    borderRadius: 1,
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: theme.shadows[2],
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  {isSecondaryLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <>
                      {getLoginIcon()}
                      {secondaryButtonText}
                    </>
                  )}
                </Button>
              </Grid>
            )}
          </Grid>

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
        </Box>
      </DialogContent>
    </Dialog>
  );
}
