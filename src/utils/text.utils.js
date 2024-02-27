import toast from "react-hot-toast";

import { isValid } from ".";

export const textResume = (text, limit) => {
  if (!isValid(text)) {
    return text;
  }

  return text.slice(0, limit) + (text.length >= limit ? "..." : "");
};

export const copyText = (text) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Texto copiado com sucesso."))
      .catch(() => {
        toast.error("Houve um erro ao copiar o Texto.");
      });
  } else {
    toast.error("Seu navegador não permite esta função.");
  }
};
