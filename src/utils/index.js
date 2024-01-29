export const isValid = (value) => {
  if (typeof value == "string" && value) {
    return true;
  }
  if (typeof value == "object" && value) {
    return true;
  }
  return false;
};
