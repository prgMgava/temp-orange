import { isValid } from "utils";

export const isEmpty = (obj) => {
  if (!isValid(obj)) {
    return true;
  }
  return Object.keys(obj).some((key) => !!obj[key]);
};

export const hasWebHook = (obj) => {
  if (!isValid(obj)) {
    return false;
  }

  const {
    whChatPresence,
    whConnecting,
    whDisconnecting,
    whReceiving,
    whSending,
    whStatusMessage,
  } = obj;

  const output = isEmpty({
    whChatPresence,
    whConnecting,
    whDisconnecting,
    whReceiving,
    whSending,
    whStatusMessage,
  });

  return !output;
};
