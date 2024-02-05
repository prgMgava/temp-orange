import { Box, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";

import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";

const ModalSendMessage = ({ handleModal: { open, onClose } }) => {
  const [value, setValue] = useState("");
  const [phone, setPhone] = useState("");

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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
      <DialogTitle
        id="alert-dialog-title"
        textAlign={"center"}
        pb={0}
        sx={{ paddingBottom: "0px" }}
      >
        <SoftTypography fontWeight="bold" color="info">
          Enviar mensagem
        </SoftTypography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Box
            textAlign={"center"}
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <SoftTypography color="text" variant="caption" opacity={0.8}>
              Aqui você pode testar o envio de mensagem da sua instância, basta
              informar o número e a mensagem que deseja enviar
            </SoftTypography>
            <Grid container spacing={2} mt={1}>
              <Grid
                item
                sm={12}
                md={12}
                display="flex"
                flexDirection="column"
                height="100%"
                width={"100%"}
              >
                <SoftBox pt={1} mb={1} display="flex" alignItems="center">
                  <SoftTypography
                    variant="caption"
                    color="text"
                    component="label"
                    htmlFor="phoneNumber"
                  >
                    Telefone
                  </SoftTypography>
                </SoftBox>

                <SoftBox mb={0}>
                  <PhoneInput
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                    defaultCountry="br"
                    name="phoneNumber"
                  />
                </SoftBox>
              </Grid>

              <Grid
                item
                sm={12}
                md={12}
                display="flex"
                flexDirection="column"
                height="100%"
                width={"100%"}
              >
                <SoftBox pt={1} mb={1} display="flex" alignItems="center">
                  <SoftTypography
                    variant="caption"
                    color="text"
                    component="label"
                    htmlFor="message"
                  >
                    Mensagem
                  </SoftTypography>
                </SoftBox>

                <SoftBox mb={0}>
                  <SoftInput
                    type="text"
                    multiline
                    required
                    rows={4}
                    icon={{
                      component: "message_outlined",
                      direction: "left",
                    }}
                    {...register("message", { required: true })}
                    error={!!errors?.message}
                    id="message"
                  ></SoftInput>
                </SoftBox>
              </Grid>
            </Grid>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <SoftButton
          onClick={handleClose}
          variant="outlined"
          color="secondary"
          type="button"
        >
          Voltar
        </SoftButton>
        <SoftButton
          onClick={handleClose}
          variant={"contained"}
          color="info"
          type="submit"
        >
          Enviar
        </SoftButton>
      </DialogActions>
    </Dialog>
  );
};

export default ModalSendMessage;
