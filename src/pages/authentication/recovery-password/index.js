// @mui material components
// Authentication layout components
import { useState } from "react";
import { useForm } from "react-hook-form";
// react-router-dom components
import { Link } from "react-router-dom";

import CoverLayout from "pages/authentication/components/CoverLayout";

import { ModalActionConfirmation } from "components/ModalActionConfirmation";
// Orange API components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

function RecoveryPassword() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <CoverLayout
        title="Recupere sua senha"
        description="Informe os campos e pronto. Sua senha será atualizada."
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
                Nova senha
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="password"
              placeholder="Informe sua nova senha"
              {...register("password", { required: true })}
              error={!!errors.password}
              id="password"
            />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Confirme a nova senha
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="passwordConfirm"
              placeholder="Confirme sua nova senha"
              {...register("passwordConfirm", {
                required: true,
                validate: (val) => {
                  if (watch("password") != val) {
                    return "Senhas não conferem";
                  }
                },
              })}
              error={!!errors.passwordConfirm}
              id="passwordConfirm"
            />
          </SoftBox>

          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" color="info" fullWidth type="submit">
              Recuperar senha
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </CoverLayout>
    </>
  );
}

export default RecoveryPassword;
