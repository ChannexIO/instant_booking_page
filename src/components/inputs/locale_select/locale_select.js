import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import Select from "components/inputs/select";

import getUrlParams from "utils/get_url_params";
import setUrlParams from "utils/set_url_params";

const AVAILABLE_LANGUAGES = [
  {
    key: "en",
    value: "ENG",
  },
  {
    key: "tr",
    value: "TUR",
  },
  {
    key: "es",
    value: "ESP",
  },
  {
    key: "pt",
    value: "PRT",
  },
  {
    key: "it",
    value: "ITA",
  },
];

export default function LocaleSelect() {
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const handleLocaleChange = useCallback(
    (localeKey) => {
      i18n.changeLanguage(localeKey);

      setUrlParams({ lang: localeKey }, history);
    },
    [i18n, history],
  );

  useEffect(
    function setSelectedLanguage() {
      const { lang } = getUrlParams();

      if (!lang) {
        return;
      }

      i18n.changeLanguage(lang);
    },
    [i18n],
  );

  return (
    <Select
      label={t("general:locale")}
      value={i18n.language}
      options={AVAILABLE_LANGUAGES}
      onChange={handleLocaleChange}
    />
  );
}
