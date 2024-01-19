import { isValid } from ".";

export const textResume = (text, limit) => {
  if (!isValid(text)) {
    return text;
  }

  return text.slice(0, limit) + (text.length >= limit ? "..." : "");
};
