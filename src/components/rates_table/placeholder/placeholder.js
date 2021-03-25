import React from "react";
import { useTranslation } from "react-i18next";
import { FrownOutlined } from "@ant-design/icons";

import styles from "./placeholder.module.css";

export default function Placeholder() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <FrownOutlined className={styles.icon} />
      <div>{t("rates_table:no_available_rates_placeholder")}</div>
    </div>
  );
}
