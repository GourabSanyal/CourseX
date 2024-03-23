/* eslint-disable unicorn/filename-case */
import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  handleClose: () => void;
  heading: string;
  primaryText: string;
  secondaryText?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  handlePrimaryButtonClick?: () => void;
  handleSecondaryButtonClick?: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function CustomModal({
  open,
  onClose,
  handleClose,
  heading,
  primaryText,
  secondaryText,
  primaryButtonText,
  secondaryButtonText,
  handlePrimaryButtonClick,
  handleSecondaryButtonClick,
}: CustomModalProps): JSX.Element {
  return (
    <Modal
      aria-describedby="modal-modal-description"
      aria-labelledby="modal-modal-title"
      onClose={handleClose}
      open={open}
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography component="h2" id="modal-modal-title" variant="h6">
            {heading}
          </Typography>
          <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
        </Box>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {primaryText}
        </Typography>
        {secondaryText ? (
          <Typography sx={{ mt: 1 }}>{secondaryText}</Typography>
        ) : null}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          {primaryButtonText ? (
            <Button
              onClick={handlePrimaryButtonClick}
              sx={{ mr: 1 }}
              variant="contained"
            >
              {primaryButtonText}
            </Button>
          ) : null}
          {secondaryButtonText ? (
            <Button onClick={handleSecondaryButtonClick} variant="outlined">
              {secondaryButtonText}
            </Button>
          ) : null}
        </Box>
      </Box>
    </Modal>
  );
}
