import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationRU from "./locales/ru/translation.json";
import translationUZ from "./locales/uz/translation.json";

const resources = {
  ru: {
    translation: translationRU,
  },
  uz: {
    translation: translationUZ,
  },
};

i18n.use(initReactI18next).init({
  resources,
  debug: false,
  fallbackLng: "ru",
});

export default i18n;
