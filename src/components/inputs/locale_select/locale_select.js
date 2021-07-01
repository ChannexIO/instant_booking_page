import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import Select from "components/inputs/select";

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

  const handleLocaleChange = useCallback(
    (localeKey) => {
      i18n.changeLanguage(localeKey);
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
