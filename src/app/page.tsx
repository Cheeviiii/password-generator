"use client";

import React, { useState } from "react";
import style from "./page.module.css";
import { Copy } from "@phosphor-icons/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(10);
  const [checkboxValues, setCheckboxValues] = useState({
    includeLowercase: true,
    includeUppercase: true,
    includeSpecialCharacters: true,
  });

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(parseInt(e.target.value));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckboxValues((prevCheckboxValues) => ({
      ...prevCheckboxValues,
      [name]: checked,
    }));
  };

  const copyText = (text: string): boolean => {
    try {
      const textField = document.createElement("textarea");
      textField.innerText = text;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      document.body.removeChild(textField);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleCopy = () => {
    if (!password) {
      throw toast.error("Nenhuma senha para ser copiada.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.success("Senha copiada com sucesso.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      copyText(password);
    }
  };

  const genPassword = (
    includeLowercase: boolean,
    includeUppercase: boolean,
    includeSpecialCharacters: boolean
  ) => {
    let lowerLetters = "abcdefghijklmnopqrstuvwxyz";
    let upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let specialCharacters = "!@#$%^&*()_-+=<>?/{}~|";
    let hasLowercase = includeLowercase;
    let hasUppercase = includeUppercase;
    let hasSepcialChars = includeSpecialCharacters;

    const allChars = `${includeLowercase ? lowerLetters : ""} ${
      includeUppercase ? upperLetters : ""
    } ${includeSpecialCharacters ? specialCharacters : ""}`;

    if (!hasLowercase && !hasUppercase && !hasSepcialChars) {
      throw toast.error(
        "A senha precisa incluir pelo menos um dos conjuntos de caracteres (minúscula, maiúscula ou caracteres especiais).",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
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

  const handleGeneratePassword = () => {
    const { includeLowercase, includeUppercase, includeSpecialCharacters } =
      checkboxValues;

    const generatedPassword = genPassword(
      includeLowercase,
      includeUppercase,
      includeSpecialCharacters
    );

    setPassword(generatedPassword);
  };

  return (
    <main className={style.main}>
      <ToastContainer />
      <h1>PASSWORD GENERATOR</h1>

      <div className={style.passwordresult}>
        <h1>{password}</h1>
        <Copy size={32} onClick={handleCopy} />
      </div>

      <div className={style.passwordConfig}>
        <div>
          <div className={style.range}>
            <div>
              <label>PASSWORD LENGTH</label>
              <p>{passwordLength}</p>
            </div>
            <input
              className={style.rangeSlider}
              type="range"
              min={5}
              max={20}
              value={passwordLength}
              onChange={changeValue}
            />
          </div>

          <div className={style.passwordOptions}>
            <div>
              <label className={style.passwordOptionContainer}>
                LETTERS UPPERCASES
                <input
                  type="checkbox"
                  name="includeUppercase"
                  checked={checkboxValues.includeUppercase}
                  onChange={handleCheckboxChange}
                />
                <span className={style.checkmark}></span>
              </label>

              <label className={style.passwordOptionContainer}>
                LETTERS LOWERCASES
                <input
                  type="checkbox"
                  name="includeLowercase"
                  checked={checkboxValues.includeLowercase}
                  onChange={handleCheckboxChange}
                />
                <span className={style.checkmark}></span>
              </label>

              <label className={style.passwordOptionContainer}>
                SPECIAL CHARACTERS
                <input
                  type="checkbox"
                  name="includeSpecialCharacters"
                  checked={checkboxValues.includeSpecialCharacters}
                  onChange={handleCheckboxChange}
                />
                <span className={style.checkmark}></span>
              </label>
            </div>
          </div>

          <div className={style.passwordButton}>
            <button onClick={handleGeneratePassword}>GENERATE PASSWORD</button>
          </div>
        </div>
      </div>
    </main>
  );
}
