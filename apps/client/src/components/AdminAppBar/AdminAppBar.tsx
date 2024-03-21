import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { adminState } from "store";
import { useSetRecoilState } from "recoil";

function AdminAppBar() {
  const router = useRouter();
  const setAdmin = useSetRecoilState(adminState);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust the breakpoint as needed

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("clicked");
    setAdmin({ isLoading: false, userEmail: null, username: null });
    router.push("/");
  };

  return (
    <AppBar>
      <Toolbar>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <div onClick={() => router.push("/")}>
            <Typography variant={"h5"}>CourseX</Typography>
          </div>
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
                    router.push("/");
                    handleClose();
                  }}
                >
                  Add Course
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 4,
              }}
            >
              <Button
                style={{ color: "white" }}
                onClick={() => {
                  router.push("/");
                }}
              >
                Add Course
              </Button>
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default AdminAppBar;
