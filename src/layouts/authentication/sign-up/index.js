/**
=========================================================
* Orange APi - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// @mui material components
import Card from "@mui/material/Card";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
// react-router-dom components
import { Link } from "react-router-dom";

// Orange APi components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const [phone, setPhone] = useState("");

  const handleSetAgremment = () => setAgremment(!agreement);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  //TODO: verify captcha
  const [captcha, setCaptcha] = useState("");

  function onClick() {
    if (captcha) alert("captcha resolvido");
    else alert("captcha pendente");
  }

  //TODO: validar telefone

  return (
    <BasicLayout
      title="Bem vindo!"
      description="Com a Orange Api você tem inúmeras possibilidades de agregar funcionalidades ao seu negócio."
      image={curved6}
    >
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_SITE_KEY}
        onChange={setCaptcha}
      />
      <Card onSubmit={handleSubmit(onSubmit)}>
        <SoftBox p={3} pb={2} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Registre sua conta
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox
            component="form"
            role="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Nome"
                {...register("name", { required: true })}
                error={!!errors?.name}
                icon={{ component: "person", direction: "left" }}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                error={errors?.email}
                icon={{ component: "email", direction: "left" }}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <PhoneInput
                value={phone}
                onChange={(phone) => setPhone(phone)}
                defaultCountry="br"
                name="phoneNumber"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                error={errors.password}
                icon={{ component: "lock", direction: "left" }}
              />
            </SoftBox>
            <SoftBox display="flex" alignItems="center"></SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                variant="gradient"
                color="dark"
                fullWidth
                type="submit"
              >
                Cadastrar
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography
                variant="button"
                color="text"
                fontWeight="regular"
              >
                Já possui uma conta?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/login"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Login
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
