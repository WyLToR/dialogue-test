import React, { createContext, useState, useContext, useEffect } from "react";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import en from "@/src/language/en.json";
import hu from "@/src/language/hu.json";

interface ILanguageContext {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}
export enum Language {
  hu = "hu",
  en = "en",
}

const initialContext: ILanguageContext = {
  language: Language.hu,
  setLanguage: () => {},
};
i18n.use(initReactI18next).init({
  resources: {
    en: { ...en },
    hu: { ...hu },
  },
  lng: "hu",
});

export const LanguageContext = createContext<ILanguageContext>(initialContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState(Language.hu);
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  return useContext(LanguageContext);
}
