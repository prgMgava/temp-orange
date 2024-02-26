/**
=========================================================
* Orange API - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// @mui material components
import Card from "@mui/material/Card";
import { AuthService } from "services/api/orangeApi/endpoints/AuthService";
import { handleErrorResponse } from "utils/handleResponses";
import { validPhoneFormat } from "utils/phone.utils";

import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PhoneInput } from "react-international-phone";
import { useMutation } from "react-query";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// Authentication layout components
import BasicLayout from "pages/authentication/components/BasicLayout";

// Orange API components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

function SignUp() {
  const [phone, setPhone] = useState("");
  const [phoneInvalid, setPhoneInvalid] = useState({});
  const captchaRef = useRef(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const clonedData = {
      ...data,
      token: captchaRef.current.getValue(),
      phoneNumber: phone,
    };
    if (!formValidator(clonedData)) {
      return;
    }

    captchaRef.current.reset();
    registerUser(clonedData);
  };

  const formValidator = (data) => {
    if (!data.token) {
      toast.error("reCAPTCHA não resolvido");
      return false;
    }
    if (!validPhoneFormat(data.phoneNumber)) {
      toast.error("Telefone inválido");
      setPhoneInvalid({ border: "1px solid red", borderRadius: "8px" });
      return false;
    }
    setPhoneInvalid({});
    return true;
  };

  const { mutate: registerUser } = useMutation({
    mutationFn: (body) => AuthService.register(body),
    onError: (e) => {
      handleErrorResponse(
        "Algo inesperado aconteceu. Tente mais tarde",
        e.response.data
      );
    },
    onSuccess: (_, body) => {
      login(body);
    },
  });

  const { mutate: login } = useMutation({
    mutationFn: (body) =>
      AuthService.login({ email: body.email, password: body.password }),
    onSuccess: () => {
      toast.success("Seja bem vindo 😊!");
      navigate("/dashboard");
    },
  });

  return (
    <BasicLayout
      title="Bem vindo!"
      description="Com a Orange Api você tem inúmeras possibilidades de agregar funcionalidades ao seu negócio."
      image={curved6}
    >
      <Card>
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
                {...register("firstName", { required: true })}
                error={!!errors?.firstName}
                icon={{ component: "person", direction: "left" }}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                error={!!errors?.email}
                icon={{ component: "email", direction: "left" }}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <PhoneInput
                value={phone}
                onChange={(phone) => setPhone(phone)}
                defaultCountry="br"
                name="phoneNumber"
                style={phoneInvalid}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                error={!!errors?.password}
                icon={{ component: "lock", direction: "left" }}
                autoComplete={"new-password"}
              />
            </SoftBox>
            <div
              className="captcha"
              style={{
                transform: "scale(0.75)",
                transformOrigin: "50% 0",
              }}
            >
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                ref={captchaRef}
                size=""
                id="g-captcha"
                style={{ display: "flex", justifyContent: "center" }}
              />
            </div>
            <SoftBox>
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
