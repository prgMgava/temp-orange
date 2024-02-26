// @mui material components
// Authentication layout components
import { AuthService } from "services/api/orangeApi/endpoints/AuthService";
import { handleErrorResponse } from "utils/handleResponses";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
// react-router-dom components
import { Link } from "react-router-dom";

import CoverLayout from "pages/authentication/components/CoverLayout";

// Orange API components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

import { ModalEmailConfirmation } from "../components/ModalEmailConfirmation/ModalEmailConfirmation";

function ForgotPassword() {
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = (data) => {
    forgotPassword(data);
  };

  const { mutate: forgotPassword } = useMutation({
    mutationFn: (body) => {
      return AuthService.forgotPassword(body);
    },
    onError: (e) => {
      handleErrorResponse(
        "Não foi possível redefinir sua senha",
        e.response?.data
      );
    },
    onSuccess: () => {
      setOpen(true);
    },
  });

  return (
    <>
      <CoverLayout
        title="Esqueceu sua senha?"
        description="Informe seu e-mail para recuperar a senha."
        image={curved9}
      >
        <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Email
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              error={!!errors.email}
              id="email"
              icon={{ component: "email", direction: "left" }}
            />
          </SoftBox>

          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" color="info" fullWidth type="submit">
              Recuperar senha
            </SoftButton>
          </SoftBox>
          <SoftBox mt={3} textAlign="center">
            <SoftTypography variant="button" color="text" fontWeight="regular">
              <SoftTypography
                component={Link}
                to="/sign-in"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Voltar
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </CoverLayout>
      <ModalEmailConfirmation
        title={"Email enviado"}
        handleModal={{ onClose: () => setOpen(false), open: open }}
      >
        <SoftTypography
          variant="caption"
          wrap
          textAlign="center"
          component="p"
          style={{ width: "200px" }}
        >
          <span>
            O e-mail para recuperação foi enviado para o endereço informado.
            Verifique também sua caixa de spam.
          </span>
        </SoftTypography>
      </ModalEmailConfirmation>
    </>
  );
}

export default ForgotPassword;
