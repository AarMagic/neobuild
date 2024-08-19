import React, { createContext, useState, useContext } from "react";

export const LanguagesContext = createContext();
export function LanguagesProvider({ children }) {
  const [language, setLanguage] = useState("");

  const setLanguageValue = (newValue) => {
    setLanguage(newValue);
  };

  return (
    <LanguagesContext.Provider value={{ language, setLanguageValue }}>
      {children} 
    </LanguagesContext.Provider>
  );
}

export function useLanguageContext() {
  return useContext(LanguagesContext);
}