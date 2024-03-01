export function validPhoneFormat(phone) {
  var regex = /^\+\d{12,13}$/;

  return regex.test(phone);
}

export function removeCharacterFromPhone(phone = "") {
  return phone.replace(/\D/g, "");
}
