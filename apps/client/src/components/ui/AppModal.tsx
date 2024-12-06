"use client";

import { Dialog, Typography, IconButton, List } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { cartState } from "store";

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
    return (
      <>
        {type === "cart" && (
          <List>
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
      maxWidth="sm"
      PaperProps={{
        style: {
          borderRadius: "10px",
        },
      }}
    >
      <div
        style={{
          border: `1px solid ${borderColor}`,
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
        {`this is type -> ${type}`}
      </div>
      <ModalContent />
    </Dialog>
  );
};

export default AppModal;
