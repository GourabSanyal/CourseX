/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/jsx-no-leaked-render */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable no-alert */

import React, { ReactNode } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Fade,
  styled,
} from '@mui/material';

// Styled components for customization
const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  outline: none;
`;

const ModalHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalContent = styled(Box)`
  margin-bottom: 24px;
`;

const ModalActions = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subTitle?: string;
  primaryButtonText?: string;
  primaryButtonAction?: () => void;
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
}

export const CustomModal : React.FC <CustomModalProps> = ({
  open,
  onClose,
  title,
  subTitle,
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonAction,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <ModalContainer>
          <ModalHeader>
            <Typography variant="h6">{title}</Typography>
            <Button onClick={onClose}>Close</Button>
          </ModalHeader>
          <ModalContent>
            <Typography variant="body1">{subTitle}</Typography>
          </ModalContent>
          <ModalActions>
            {primaryButtonText && (
              <Button
                variant="contained"
                onClick={primaryButtonAction}
                color="primary"
              >
                {primaryButtonText}
              </Button>
            )}
            {secondaryButtonText && (
              <Button
                variant="outlined"
                onClick={secondaryButtonAction}
                color="secondary"
              >
                {secondaryButtonText}
              </Button>
            )}
          </ModalActions>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};