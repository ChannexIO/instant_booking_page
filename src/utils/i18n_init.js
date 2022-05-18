import i18next from "i18next";
import de from "translations/de.json";
import el from "translations/el.json";
import en from "translations/en.json";
import es from "translations/es.json";
import fr from "translations/fr.json";
import it from "translations/it.json";
import pt from "translations/pt.json";
import tr from "translations/tr.json";
import sr from "translations/sr.json";

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
      de,
      fr,
      el,
      sr,
    },
  });

export default i18nInit;
