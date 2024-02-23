// @mui material components
// Authentication layout components
import { AuthService } from "services/api/orangeApi/endpoints/AuthService";
import { handleErrorResponse } from "utils/handleResponses";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
// react-router-dom components
import { Link, Navigate, useNavigate } from "react-router-dom";

import CoverLayout from "pages/authentication/components/CoverLayout";

// Orange API components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

function SignIn() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = (data) => {
    handleLogin(data);
  };

  const { mutate: handleLogin } = useMutation({
    mutationFn: (body) => AuthService.login(body),
    onError: (e) => {
      handleErrorResponse(
        "Não foi possível realizar o login",
        e.response?.data
      );
    },
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  return (
    <CoverLayout
      title="Bem vindo"
      description="Digite seu email e sua senha para realizar o login"
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
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography
              component="label"
              variant="caption"
              fontWeight="bold"
            >
              Senha
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            error={!!errors.password}
            id="password"
            icon={{ component: "lock", direction: "left" }}
          />
        </SoftBox>

        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth type="submit">
            Entrar
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Não tem uma conta ainda?{" "}
            <SoftTypography
              component={Link}
              to="/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Registrar
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
