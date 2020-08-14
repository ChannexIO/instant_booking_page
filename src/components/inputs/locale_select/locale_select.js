import React, { useCallback } from 'react';
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import Select from "components/inputs/select"

import styles from "./locale_select.module.css";  

const AVAILABLE_LANGUAGES = [
  {
    key: "en",
    value: "ENG",
  },
  {
    key: "test",
    value: "TEST",
  },
];

export default function LocaleSelect() {
  const { t, i18n } = useTranslation();

  const handleLocaleChange = useCallback((localeKey) => {
    i18n.changeLanguage(localeKey);
  }, [i18n]);

  return (
    <Select value={i18n.language} options={AVAILABLE_LANGUAGES} onChange={handleLocaleChange}>
      <GlobalOutlined className={styles.icon} />{t("general:locale")}
    </Select>
  );
}