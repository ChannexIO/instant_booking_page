import i18next from "i18next";

import en from "translations/en.json";
import test from "translations/test.json";

const i18nInit = () => i18next.init({
  interpolation: { escapeValue: false },
  defaultNS: "common",
  lng: "en",
  resources: {
    en,
    test,
  },
})

export default i18nInit;
