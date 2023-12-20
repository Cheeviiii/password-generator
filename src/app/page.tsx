"use client";

import style from "./page.module.css";
import { Copy } from "@phosphor-icons/react";
import { copyText } from "@/lib/copyText";
import { genPassword } from "@/lib/passwordUtils";
import { useAppContext } from "@/context/AppStateContext";
import { toastError } from "@/lib/toasts";

export default function Home() {
  const { password, setPassword, passwordLength, setPasswordLength, checkboxValues, setCheckboxValues } =
    useAppContext();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckboxValues((prevCheckboxValues) => ({
      ...prevCheckboxValues,
      [name]: checked,
    }));
  };

  const handleCopy = () => {
    !password ? toastError("Nenhuma senha para ser copiada") : copyText(password);
  };

  const handleGeneratePassword = () => {
    const { includeLowercase, includeUppercase, includeSpecialCharacters } = checkboxValues;
    const generatedPassword = genPassword(includeLowercase, includeUppercase, includeSpecialCharacters, passwordLength);
    setPassword(generatedPassword);
  };

  return (
    <main className={style.main}>
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
              onChange={(e) => setPasswordLength(parseInt(e.target.value))}
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
