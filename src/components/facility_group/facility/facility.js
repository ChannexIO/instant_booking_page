import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./facility.module.css";

export default function Facility({ code }) {
  const { t } = useTranslation();

  return (
    <div className={styles.facility}>
      <div className={styles.facilityTitle}>{t(`facilities:${code.toLowerCase()}`)}</div>
    </div>
  );
}
