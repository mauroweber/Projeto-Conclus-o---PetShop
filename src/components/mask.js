export const cpfMask = (value) => {
  return value
    .replace(/\D/g, "") //substitui qualquer caracter que não seja numero por nada
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};
