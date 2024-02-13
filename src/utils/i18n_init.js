import i18next from "i18next";
import HttpApi from "i18next-http-backend";

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
  i18next.use(HttpApi).init({
    interpolation: { escapeValue: false },
    defaultNS: "common",
    lng: getDefaultLanguage(),
    fallbackLng: DEFAULT_LANG,
    keySeparator: ":",
    backend: {
      loadPath:
        "https://translations.fra1.digitaloceanspaces.com/translations/152597a0-8392-4dba-ab9a-ce9013144f36/{{lng}}.json",
    },
  });

export default i18nInit;
