// @mui material components
// Authentication layout components
import { AuthService } from "services/api/orangeApi/endpoints/AuthService";
import { handleErrorResponse } from "utils/handleResponses";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
// react-router-dom components
import { useNavigate, useSearchParams } from "react-router-dom";

import CoverLayout from "pages/authentication/components/CoverLayout";

// Orange API components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

function RecoveryPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const hash = params.get("hash");
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const { password } = data;
    recoveryPassword({ password, hash });
  };

  const { mutate: recoveryPassword } = useMutation({
    mutationFn: (body) => {
      return AuthService.resetPassword(body);
    },
    onError: (e) => {
      handleErrorResponse(
        "Não foi possível redefinir sua senha",
        e.response?.data
      );
    },
    onSuccess: () => {
      toast.success("Senha redefinida com sucesso");
      navigate("/login");
    },
  });

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
              type="password"
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
