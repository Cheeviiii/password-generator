import { toastError } from "./toasts";

export const genPassword = (
  includeLowercase: boolean,
  includeUppercase: boolean,
  includeSpecialCharacters: boolean,
  passwordLength: number
) => {
  let lowerLetters = "abcdefghijklmnopqrstuvwxyz";
  let upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let specialCharacters = "!@#$%^&*()_-+=<>?/{}~|";
  let hasLowercase = includeLowercase;
  let hasUppercase = includeUppercase;
  let hasSepcialChars = includeSpecialCharacters;

  const allChars = `${includeLowercase ? lowerLetters : ""} ${includeUppercase ? upperLetters : ""} ${
    includeSpecialCharacters ? specialCharacters : ""
  }`;

  if (!hasLowercase && !hasUppercase && !hasSepcialChars) {
    throw toastError(
      "A senha precisa incluir pelo menos um dos conjuntos de caracteres (minúscula, maiúscula ou caracteres especiais)."
    );
  }

  var genPassword = "";
  let remainingLength = passwordLength;

  while (remainingLength > 0) {
    const randomPassowrd = Math.floor(Math.random() * allChars.length);
    const char = allChars.charAt(randomPassowrd);

    if (
      (hasLowercase && lowerLetters.includes(char)) ||
      (hasUppercase && upperLetters.includes(char)) ||
      (hasSepcialChars && specialCharacters.includes(char))
    ) {
      genPassword += char;
      remainingLength--;
    }
  }
  return genPassword;
};
