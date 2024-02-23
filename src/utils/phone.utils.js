export function validPhoneFormat(telefone) {
  var regex = /^\+\d{12,13}$/;

  return regex.test(telefone);
}
