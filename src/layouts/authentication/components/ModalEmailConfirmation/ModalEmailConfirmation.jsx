import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useState } from "react";

import SoftTypography from "components/SoftTypography";

export const ModalEmailConfirmation = ({
  handleModal: { open, onClose },
  title,
  children,
}) => {
  const [value, setValue] = useState("");

  const handleClose = () => {
    onClose();
    setValue("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" textAlign={"center"}>
        <SoftTypography fontWeight="bold" color="info">
          {title}
        </SoftTypography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
