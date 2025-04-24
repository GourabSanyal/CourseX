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
  Badge,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { cartState, userState } from "store";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { signOut } from "next-auth/react";
import AppModal from "@/components/ui/AppModal";
import { toast } from "sonner";
import axios from "axios";
import userCartTotal from "@/utils/cart/userCartTotal";
import { useCart } from "@/hooks/useCart";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";

function UserAppBar() {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isCartModalOpen, setisCartModalOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const totalAmount = userCartTotal();
  const { forceSync } = useCart();

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
    forceSync();
    setisCartModalOpen(!isCartModalOpen);
  };

  const cart = useRecoilValue(cartState);
  const cartItems = Object.values(cart).length;

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post("/api/order/route", {
        amount: totalAmount * 100,
      });
      const data = response.data;

      if (!data.orderID) {
        toast.error("Failed to create order. Please try again.");
        return;
      }

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: totalAmount,
        currency: "INR",
        name: "CourseX",
        description: "Course Payment",
        order_id: response.data.orderID,
        handler: async function (response: any) {
          toast.success("Payment successful! Redirecting...", {
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
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
      rzp.on("payment.failed", function (response: any) {
        toast.error("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
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
                router.push("/user/home");
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
                handleCartModal();
                handleClose();
              }}
              sx={{
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <Badge
                badgeContent={cartItems}
                color="primary"
                sx={{ mr: 2 }}
              >
                <ShoppingCartIcon sx={{ color: 'primary.main' }} />
              </Badge>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: '1rem',
                }}
              >
                Cart
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
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
            onClick={() => router.push("/user/home")}
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
            startIcon={
              <Badge
                badgeContent={cartItems}
                color="primary"
              >
                <ShoppingCartIcon />
              </Badge>
            }
            onClick={handleCartModal}
            sx={{
              textTransform: 'none',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
              },
            }}
          >
            Cart
          </Button>
          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
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
      <AppModal
        open={isCartModalOpen}
        onClose={handleCartModal}
        title="Cart items"
        type="cart"
        handlePayment={handlePayment}
        paymentProcessing={isProcessing}
      />
    </>
  );
}

export default UserAppBar;
