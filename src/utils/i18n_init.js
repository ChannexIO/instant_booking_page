import i18next from "i18next";
import en from "translations/en.json";
import es from "translations/es.json";
import it from "translations/it.json";
import pt from "translations/pt.json";
import tr from "translations/tr.json";

import SUPPORTED_LANGUAGES from "constants/supported_languages";
import getUrlParams from "utils/get_url_params";

const DEFAULT_LANG = "en";

const getIslanguageSupported = (lngCode) => {
  return SUPPORTED_LANGUAGES.find((language) => language.key === lngCode);
};

const getDefaultLanguage = () => {
  const userLang = window.navigator.language?.substr(0, 2);
  const { lang } = getUrlParams();

  if (getIslanguageSupported(lang)) {
    return lang;
  }

  if (getIslanguageSupported(userLang)) {
    return userLang;
  }

  return DEFAULT_LANG;
};

const i18nInit = () =>
  i18next.init({
    interpolation: { escapeValue: false },
    defaultNS: "common",
    lng: getDefaultLanguage(),
    resources: {
      en,
      tr,
      es,
      pt,
      it,
    },
  });

export default i18nInit;
