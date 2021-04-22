import React from "react";
import { useTranslation } from "react-i18next";

import EmptyIcon from "static/empty-property.svg";
import styles from "./unactive_search_page.module.css";

export default function UnActiveSearchPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <img src={EmptyIcon} alt={t("properties:unActiveSearchPage")} />
    </div>
  );
}
