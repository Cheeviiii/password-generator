import { toastSuccess } from "./toasts";

export const copyText = (text: string): boolean => {
  try {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    document.body.removeChild(textField);
    toastSuccess("Senha copiada");
    return true;
  } catch (err) {
    return false;
  }
};
