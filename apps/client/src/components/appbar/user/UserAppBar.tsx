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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { cartState, userState } from "store";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { signOut } from "next-auth/react";
import AppModal from "@/components/ui/AppModal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Badge } from "@mui/material";
import { toast } from "sonner";
import axios from "axios";
import userCartTotal from "@/utils/cart/userCartTotal";

function UserAppBar() {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isCartModalOpen, setisCartModalOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust the breakpoint as needed
  const totalAmount = userCartTotal();

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    setUser({ isLoading: false, userEmail: null, username: null });
  };

  const handleCartModal = () => {
    if (isCartModalOpen) {
      setisCartModalOpen(false);
    } else {
      setisCartModalOpen(true);
    }
  };

  const cart = useRecoilValue(cartState);
  const cartItems = Object.values(cart).length;


  const redirectUserAfterSuccessfulPayment = () => {
      
    console.log("redirecting");
    toast.success("Payment successful! Redirecting...", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // create order
      const response = await axios.post("/api/order/route", {
        amount: totalAmount * 100,
      });
      const data = response.data;

      if (!data.orderID) {
        toast.error("Failed to create order. Please try again.");
        return; // exit when order creation failed
      }

      // init payment
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: totalAmount,
        currency: "INR",
        name: "CourseX",
        description: "Course Payment",
        order_id: response.data.orderID,
        handler: async function (response: any) {
          console.log("Payment successfull", response);
          // Handle payment success - UI update
          redirectUserAfterSuccessfulPayment();
        },
        prefill: {
          name: "test name",
          email: "test email",
          contact: 45789,
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          escape: false,
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on(
        "payment.failed",
        function (response: {
          error: {
            code: string;
            description: string;
            source: string;
            step: string;
            reason: string;
          };
        }) {
          console.error("Payment failed haha", response);
          toast.error("Payment failed. Please try again.");
        }
      );
      rzp.open();
      console.log("payment obj from api", response);
      if (response.data.statusCode === "401") {
        toast.error("Payment Failed, please try again later");
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
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
                    handleClose();
                    router.push("/user/home");
                  }}
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setisCartModalOpen(true);
                  }}
                >
                  Cart ₹ {cartItems}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  Logout
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
                  router.push("/user/home");
                }}
              >
                Dashboard
              </Button>
              <Button
                style={{ color: "white" }}
                onClick={() => {
                  setisCartModalOpen(true);
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Badge
                    badgeContent={cartItems}
                    color="primary"
                    invisible={cartItems === 0} // Hide badge if there are no items
                    sx={{
                      position: "absolute",
                      top: -16,
                      right: -14,
                    }}
                  >
                    <ShoppingCartIcon sx={{ fontSize: 30 }} />
                  </Badge>
                </Box>
              </Button>
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </Toolbar>
      <AppModal
        open={isCartModalOpen}
        onClose={handleCartModal}
        title="Cart items"
        type="cart"
        handlePayment={handlePayment}
        paymentProcessing={isProcessing}
      />
    </AppBar>
  );
}

export default UserAppBar;
