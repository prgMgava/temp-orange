import toast from "react-hot-toast";

export const handleSuccessResponse = (message) => {
  toast.success(message);
};

export const handleErrorResponse = (message, error) => {
  if (!!error && Object.keys(error).length) {
    const mensagemFormatada = formataMsgError(error);
    toast.error(mensagemFormatada);
    return;
  }
  toast.error(message);
};

export const formataMsgError = (errors) => {
  const messages = [];
  Object.keys(errors).map((key) => {
    messages.push(...errors[key].map((item) => item));
  });
  return `Não foi possível realizar esta operação devido ao(s) seguinte(s) erro(s): ${messages.join(
    ", "
  )}`;
};
