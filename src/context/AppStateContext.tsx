"use client";

import React, { createContext, useContext, useState } from "react";

interface AppContextProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordLength: number;
  setPasswordLength: React.Dispatch<React.SetStateAction<number>>;
  checkboxValues: {
    includeLowercase: boolean;
    includeUppercase: boolean;
    includeSpecialCharacters: boolean;
  };
  setCheckboxValues: React.Dispatch<
    React.SetStateAction<{
      includeLowercase: boolean;
      includeUppercase: boolean;
      includeSpecialCharacters: boolean;
    }>
  >;
}

const AppStateContext = createContext<AppContextProps | undefined>(undefined);

export const AppStateProvider = ({ children }: any) => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(10);
  const [checkboxValues, setCheckboxValues] = useState({
    includeLowercase: true,
    includeUppercase: true,
    includeSpecialCharacters: true,
  });

  const contextValues: AppContextProps = {
    password,
    setPassword,
    passwordLength,
    setPasswordLength,
    checkboxValues,
    setCheckboxValues,
  };

  return <AppStateContext.Provider value={contextValues}>{children}</AppStateContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState deve ser usado dentro de um AppStateProvider");
  }
  return context;
};
