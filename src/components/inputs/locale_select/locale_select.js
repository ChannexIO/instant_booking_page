import React from 'react';
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import Select from "components/inputs/select"

import styles from "./locale_select.module.css";  

export default function LocaleSelect() {
  const { t } = useTranslation();

  return (
    <Select value={""} options={[]} onChange={()=>{}}>
      <GlobalOutlined className={styles.icon} />{t("general:locale")}
    </Select>
  );
}