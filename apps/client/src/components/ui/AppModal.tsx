"use client";

import {
  Dialog,
  Typography,
  IconButton,
  List,
  ListItem,
  Skeleton,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useRecoilState, useRecoilValue } from "recoil";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { cartState } from "store";
import { ArrowOutward } from "@mui/icons-material";
import { Course } from "shared-types";
import Script from "next/script";
import userCartTotal from "@/utils/cart/userCartTotal";
import { useCart } from "@/hooks/useCart";

type ModalActions = {
  label: string;
  onClick: () => void;
  colour?:
    | "primary"
    | "secondary"
    | "error"
    | "inherit"
    | "success"
    | "warning"
    | undefined;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface AppModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  type: "success" | "alert" | "info" | "cart";
  handlePayment: () => void;
  paymentProcessing: boolean;
}

const AppModal: React.FC<AppModalProps> = ({
  open,
  onClose,
  title,
  type,
  handlePayment,
  paymentProcessing,
}) => {
  const getTypes = (modalType: AppModalProps["type"]) => {
    switch (modalType) {
      case "success":
        return { titleColor: "green", borderColor: "green" };
      case "alert":
        return { titleColor: "red", borderColor: "red" };
      case "cart":
        return { titleColor: "black", borderColor: "grey" };
      default:
        return { titleColor: "black", borderColor: "gray" };
    }
  };

  const { titleColor, borderColor } = getTypes(type);

  const ModalContent = () => {
    const [cartItems, setCartItems] = useRecoilState<Record<string, Course>>(cartState);
    const [isImageLoading, setIsImageLoading] = useState<Record<string, boolean>>({});
    const totalAmount = userCartTotal();
    const { forceSync } = useCart();

    const isCartEmpty = Object.keys(cartItems).length === 0;

    const removeFromCart = async (itemId: string) => {
      try {
        setCartItems((prevCart) => {
          const updatedCart: Record<string, Course> = { ...prevCart };
          delete updatedCart[itemId];
          return updatedCart;
        });
        await forceSync();
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    };

    return (
      <>
        {type === "cart" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "500px",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <Box 
              sx={{ 
                flex: 1, 
                overflowY: "auto", 
                p: 2,
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: '4px',
                  '&:hover': {
                    background: '#555',
                  },
                },
              }}
            >
              <List sx={{ width: "100%" }}>
                {Object.keys(cartItems).length === 0 ? (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '300px',
                    color: 'text.secondary'
                  }}>
                    <ShoppingCart sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                    <Typography variant="h6">Your cart is empty</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>Add some courses to get started</Typography>
                  </Box>
                ) : (
                  Object.entries(cartItems).map(([key, item]) => (
                    <ListItem 
                      key={key}
                      sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: 120,
                          height: 80,
                          mr: 2,
                          borderRadius: 1,
                          overflow: 'hidden',
                        }}
                      >
                        {isImageLoading[key] && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: 'background.default',
                            }}
                          >
                            <CircularProgress size={24} />
                          </Box>
                        )}
                        <Image
                          src={item.imageLink}
                          alt={item.title}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 120px) 100vw, 120px"
                          onLoadingComplete={() => setIsImageLoading(prev => ({ ...prev, [key]: false }))}
                          onError={() => setIsImageLoading(prev => ({ ...prev, [key]: false }))}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 500,
                              mb: 1,
                            }}
                          >
                            {item.title}
                          </Typography>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => removeFromCart(key)}
                            sx={{
                              '&:hover': {
                                transform: 'scale(1.1)',
                              }
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            color: 'primary.main',
                            fontWeight: 600,
                          }}
                        >
                          ₹ {item.price}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))
                )}
              </List>
            </Box>
            <Box
              sx={{
                p: 3,
                borderTop: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Total Amount</Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>₹ {totalAmount}</Typography>
              </Box>
              <Button
                disabled={isCartEmpty || paymentProcessing}
                variant="contained"
                color="primary"
                endIcon={
                  paymentProcessing ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <ArrowOutward />
                  )
                }
                onClick={handlePayment}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  },
                  '&.Mui-disabled': {
                    backgroundColor: 'action.disabledBackground',
                    color: 'action.disabled',
                  }
                }}
              >
                {paymentProcessing ? "Processing..." : "Proceed to Checkout"}
              </Button>
            </Box>
          </Box>
        )}
      </>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        style: {
          borderRadius: "10px",
        },
      }}
    >
      <div
        style={{
          padding: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "01px solid #eee",
            paddingBottom: "12px",
          }}
        >
          <div>
            <Typography variant="h5" style={{ color: titleColor }}>
              {title}
            </Typography>
          </div>
          <div>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <ModalContent />
    </Dialog>
  );
};

export default AppModal;
