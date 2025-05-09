import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export function useLanguage() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };
  
  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  
  return {
    language,
    changeLanguage,
    isKorean: language === 'ko',
    isEnglish: language === 'en',
  };
}
