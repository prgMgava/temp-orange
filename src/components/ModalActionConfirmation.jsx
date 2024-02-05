import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useState } from "react";

import SoftButton from "./SoftButton";
import SoftInput from "./SoftInput";
import SoftTypography from "./SoftTypography";

export const ModalActionConfirmation = ({
  handleModal: { open, onClose },
  title,
  description,
  typeSecurity = false,
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
          <Box textAlign={"center"}>
            <SoftTypography color="text" variant="caption" opacity={0.8}>
              {description}
            </SoftTypography>
            {typeSecurity && (
              <>
                <br />
                <SoftTypography color="text" variant="button">
                  Para continuar digite{" "}
                  <SoftTypography
                    color="error"
                    variant="caption"
                    fontWeight="bold"
                  >
                    CANCELAR{" "}
                  </SoftTypography>
                  no campo abaixo
                </SoftTypography>
              </>
            )}
          </Box>
          {typeSecurity && (
            <div style={{ maxWidth: "300px", margin: "16px auto 0" }}>
              <SoftInput
                size="small"
                placeholder="Digite o texto de confirmação aqui"
                onChange={(e) => setValue(e.target.value)}
              ></SoftInput>
            </div>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <SoftButton onClick={handleClose} variant="outlined" color="secondary">
          Voltar
        </SoftButton>
        <SoftButton
          onClick={handleClose}
          variant={"contained"}
          color="error"
          disabled={"CANCELAR" != value.toUpperCase()}
        >
          Excluir
        </SoftButton>
      </DialogActions>
    </Dialog>
  );
};
