import React, { useState } from "react";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu"; // Ensure you have this import

const AdminAppBar = () => {
  // Responsiveness mobile logic
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust the breakpoint as needed
  const router = useRouter();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const adminLogout = () => {
    console.log("admin logout");
    signOut();
  };

  return (
    <>
      {isMobile ? (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
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
          >
            <MenuItem
              onClick={() => {
                handleClose();
                adminLogout();
              }}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                router.push("/user/signin");
              }}
            >
              Add Course
            </MenuItem>
            <MenuItem onClick={adminLogout}>Log Out</MenuItem>
          </Menu>
        </div>
      ) : (
        <div style={{ display: "flex", marginLeft: "auto" }}>
          <Button
            style={{ color: "white", marginRight: 10 }}
            onClick={() => {
              // redirect to dashboard here
            }}
          >
            Dashboard
          </Button>
          <Button
            style={{ color: "white", marginRight: 10 }}
            onClick={() => {
              // redirect to add course here
            }}
          >
            Add Course
          </Button>
          <Button variant="contained" onClick={adminLogout}>
            Logout
          </Button>
        </div>
      )}
    </>
  );
};

export default AdminAppBar;
