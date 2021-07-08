import i18next from "i18next";
import en from "translations/en.json";
import es from "translations/es.json";
import it from "translations/it.json";
import pt from "translations/pt.json";
import tr from "translations/tr.json";

const i18nInit = () =>
  i18next.init({
    interpolation: { escapeValue: false },
    defaultNS: "common",
    lng: "en",
    resources: {
      en,
      tr,
      es,
      pt,
      it,
    },
  });

export default i18nInit;
