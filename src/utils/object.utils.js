import { isValid } from "utils";

export const isEmpty = (obj) => {
  if (!isValid(obj)) {
    return true;
  }
  return Object.keys(obj).some((key) => !!obj[key]);
};
