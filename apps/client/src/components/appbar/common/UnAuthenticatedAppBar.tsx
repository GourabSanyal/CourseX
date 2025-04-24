import React, { useCallback } from "react";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Typography,
  Box,
} from "@mui/material";
import { CustomModal } from "ui";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import { AdminModal } from "ui";
import { useLoginModal } from "@/hooks/useLoginModal";

const UnAuthenticatedAppBar = () => {
  const router = useRouter();
  const theme = useTheme();
  const { 
    isOpen, 
    isAdminModalOpen,
    error, 
    openLoginModal, 
    closeLoginModal, 
    closeAdminModal,
    handleLogin, 
    setError,
    handleAdminSubmission,
    isSignInRef
  } = useLoginModal();

  // responsiveness
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleCloseModal = () => {
    closeAdminModal();
    closeLoginModal();
  };

  return (
    <>
      {isMobile ? (
        <Box>
          <IconButton
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
              },
              p: 1,
            }}
          >
            <MenuIcon 
              sx={{ 
                fontSize: '2rem',
                color: 'primary.main',
              }} 
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                borderRadius: 2,
                minWidth: 200,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <MenuItem
              onClick={() => {
                openLoginModal();
                handleClose();
              }}
              sx={{
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <LoginIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: '1rem',
                }}
              >
                Login
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<LoginIcon />}
            onClick={openLoginModal}
            sx={{
              textTransform: 'none',
              borderRadius: '50px',
              px: 3,
              py: 1,
              fontSize: '1rem',
              fontWeight: 500,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            Login
          </Button>
        </Box>
      )}
      <CustomModal
        open={isOpen}
        onClose={handleCloseModal}
        heading="Login and start learning"
        subHeading="Start your journey"
        primaryButtonText="Login as Admin"
        primaryButtonSubmit={() => handleLogin("admin")}
        secondaryButtonText="Login As User"
        secondaryButtonSubmit={() => handleLogin("user")}
        onError={error}
      />
      <AdminModal
        open={isAdminModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAdminSubmission}
        isSignInRef={isSignInRef}
        onError={error}
        handleResetError={() => setError(null)}
      />
    </>
  );
};

export default UnAuthenticatedAppBar;
