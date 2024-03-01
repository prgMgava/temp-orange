import { Box, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { WebInstanceService } from "services/api/orangeApi/endpoints/WebInstanceService";
import { handleErrorResponse } from "utils/handleResponses";
import { removeCharacterFromPhone, validPhoneFormat } from "utils/phone.utils";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PhoneInput } from "react-international-phone";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Loader from "react-spinner-loader";

import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";

const ModalSendMessage = ({ handleModal: { open, onClose } }) => {
  const [value, setValue] = useState("");
  const [phone, setPhone] = useState("");
  const { webInstanceId } = useParams();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm();

  const onSubmit = (data) => {
    const isFormValid = validForm(data);
    if (!isFormValid) {
      toast.error("Telefone válido deve ser informado!");
      return;
    }
    const message = formatData(data);
    sendTextMessage(message);
  };

  const validForm = (data) => {
    return validPhoneFormat(phone);
  };

  const formatData = (data) => {
    return {
      number: removeCharacterFromPhone(phone),
      textMessage: {
        text: data.text,
      },
    };
  };

  const { mutate: sendTextMessage, isLoading } = useMutation({
    mutationFn: (message) =>
      WebInstanceService.sendTextMessage(webInstanceId, message),
    onError: (e) => {
      handleErrorResponse(
        "Não foi possível enviar a mensagem, tente mais tarde",
        e.response?.data
      );
    },
    onSuccess: () => {
      toast.success("Mensagem enviada com sucesso!");
      handleClose();
    },
  });

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
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
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
          <Box textAlign={"center"}>
            <SoftTypography color="text" variant="caption" opacity={0.8}>
              Aqui você pode testar o envio de mensagem da sua instância, basta
              informar o número e a mensagem que deseja enviar
            </SoftTypography>
            {isLoading ? (
              <Loader show={isLoading}></Loader>
            ) : (
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
                      {...register("text", { required: true })}
                      error={!!errors?.text}
                      id="text"
                    ></SoftInput>
                  </SoftBox>
                </Grid>
              </Grid>
            )}
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <SoftButton
          onClick={handleClose}
          variant="outlined"
          color="secondary"
          type="button"
          disabled={isLoading}
        >
          Voltar
        </SoftButton>
        <SoftButton
          variant={"contained"}
          color="info"
          type="submit"
          disabled={isLoading}
        >
          Enviar
        </SoftButton>
      </DialogActions>
    </Dialog>
  );
};

export default ModalSendMessage;
