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
    const [isLoading, setIsLoading] = useState(true);
    const [cartItems, setCartItems] =
      useRecoilState<Record<string, Course>>(cartState);
    const cart = useRecoilValue(cartState);
    const totalAmount = userCartTotal();
    const { forceSync } = useCart();

    useEffect(() => {
      setIsLoading(false);
    }, [cart]);

    const isCartEmpty = Object.keys(cartItems).length === 0;

    const removeFromCart = async (itemId: string) => {
      setCartItems((prevCart) => {
        const updatedCart: Record<string, Course> = { ...prevCart };
        delete updatedCart[itemId];
        return updatedCart;
      });
      forceSync()
    };

    if (isLoading) {
      return (
        <List sx={{ width: "100%" }}>
          {[1, 2, 3].map((i) => (
            <ListItem key={i} sx={{ mb: 20 }}>
              <Skeleton
                variant="rectangular"
                width={100}
                height={400}
                sx={{ mr: 2 }}
              />
              <Box sx={{ width: "100%" }}>
                <Skeleton width="60%" height={24} />
                <Skeleton width="80%" height={20} sx={{ mt: 1 }} />
              </Box>
            </ListItem>
          ))}
        </List>
      );
    }

    return (
      <>
        {type === "cart" && (
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "400px" }}
          >
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
              <List sx={{ width: "100%" }}>
                {Object.keys(cartItems).length === 0 ? (
                  <Typography sx={{ textAlign: "center" }}>
                    Your cart is empty
                  </Typography>
                ) : (
                  Object.entries(cartItems).map(([key, item]) => (
                    <ListItem key={key}>
                      <Box
                        sx={{
                          position: "relative",
                          width: 120,
                          height: 80,
                          mr: 2,
                        }}
                      >
                        <Image
                          src={item.imageLink}
                          alt={item.title}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 120px) 100vw, 120px"
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h6">{item.title}</Typography>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => removeFromCart(key)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mt: 1 }}>
                          ₹ {item.price}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))
                )}
              </List>
            </Box>
            {/* footer */}
            <Box
              sx={{
                p: 2,
                borderTop: "1px solid #eee",
                bgcolor: "background.paper",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Total: ₹ {totalAmount}</Typography>
              <Button
                disabled={isCartEmpty || paymentProcessing}
                variant="contained"
                color="primary"
                endIcon={
                  paymentProcessing ? (
                    <CircularProgress size={20} />
                  ) : (
                    <ArrowOutward />
                  )
                }
                onClick={handlePayment}
              >
                {paymentProcessing ? "Processing..." : "Checkout"}
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
