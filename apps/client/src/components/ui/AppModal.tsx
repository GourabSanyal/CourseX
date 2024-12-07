"use client";

import {
  Dialog,
  Typography,
  IconButton,
  List,
  ListItem,
  Skeleton,
  Box,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { cartState } from "store";
import {  ArrowOutward } from "@mui/icons-material";

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

interface AppModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  type: "success" | "alert" | "info" | "cart";
}

interface CartItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageLink: string;
}

const AppModal: React.FC<AppModalProps> = ({ open, onClose, title, type }) => {
  const getTypes = (modalType: AppModalProps["type"]) => {
    switch (type) {
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
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const cart = useRecoilValue(cartState);

    useEffect(() => {

      setIsLoading(false);
    }, [cart]);

    if (isLoading) {
      return (
        <List sx={{ width: "100%" }}>
          {[1, 2, 3].map((i) => (
            <ListItem key={i} sx={{ mb: 20 }}>
              <Skeleton
                variant="rectangular"
                width={120}
                height={80}
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
          <List sx={{ width: "100%" }}>
            {/* {cartItems.map((item) => ( */}
            <ListItem
              // key={item._id}
              sx={{
                mb: 2,
                display: "flex",
                alignItems: "flex-start",
                pb: 2,
              }}
            >
              <Box sx={{ position: "relative", width: 120, height: 80, mr: 2 }}>
                {/* <Image
                    src={item.imageLink}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  /> */}
                <Typography> image box</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    // mb: 1,
                  }}
                >
                  <Typography variant="h6">
                    {/* {item.title} */}
                    Dummy title
                  </Typography>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      // Remove item handler here
                    }}
                  >
                    <Button>

                    <DeleteIcon />
                    </Button>
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {/* {item.description} */}
                  dummy desc
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  {/* ${item.price} */}
                  Dummy privr
                </Typography>
              </Box>
            </ListItem>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: 3, mb : 2.5 }}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowOutward />}
              >
                Checkout
              </Button>
            </Box>
            {/* )
            )} */}
          </List>
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
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #eee",
            paddingBottom: "12px",
            marginBottom: "20px",
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
