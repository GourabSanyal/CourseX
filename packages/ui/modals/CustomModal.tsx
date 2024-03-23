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
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {heading}
          </Typography>
          <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
        </Box>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {primaryText}
        </Typography>
        {secondaryText && (
          <Typography sx={{ mt: 1 }}>{secondaryText}</Typography>
        )}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          {primaryButtonText && (
            <Button
              variant="contained"
              onClick={handlePrimaryButtonClick}
              sx={{ mr: 1 }}
            >
              {primaryButtonText}
            </Button>
          )}
          {secondaryButtonText && (
            <Button variant="outlined" onClick={handleSecondaryButtonClick}>
              {secondaryButtonText}
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
