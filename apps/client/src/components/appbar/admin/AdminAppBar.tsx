import React, { useState } from "react";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
} from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const AdminAppBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const adminLogout = () => {
    signOut({ callbackUrl: "/" });
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
                handleClose();
                router.push("/admin/dashboard");
              }}
              sx={{
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <DashboardIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: '1rem',
                }}
              >
                Dashboard
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                router.push("/admin/addCourse");
              }}
              sx={{
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <AddCircleIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: '1rem',
                }}
              >
                Add Course
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={adminLogout}
              sx={{
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <LogoutIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: '1rem',
                }}
              >
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="text"
            startIcon={<DashboardIcon />}
            onClick={() => router.push("/admin/dashboard")}
            sx={{
              textTransform: 'none',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
              },
            }}
          >
            Dashboard
          </Button>
          <Button
            variant="text"
            startIcon={<AddCircleIcon />}
            onClick={() => router.push("/admin/addCourse")}
            sx={{
              textTransform: 'none',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
              },
            }}
          >
            Add Course
          </Button>
          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={adminLogout}
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
            Logout
          </Button>
        </Box>
      )}
    </>
  );
};

export default AdminAppBar;
