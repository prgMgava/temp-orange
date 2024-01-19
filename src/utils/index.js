export const isValid = (value) => {
  if (typeof value == "string" && value) {
    return true;
  }
  return false;
};
