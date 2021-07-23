import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import Header from "components/header";
import MainSearch from "components/main_search";

import { AppDataContext } from "containers/data_context";

import EmptyIcon from "static/empty-property.svg";
import styles from "./home_page.module.css";

export default function HomePage() {
  const { t } = useTranslation();
  const { featureFlags } = useContext(AppDataContext);
  if (!featureFlags.searchPageIsActive) {
    return (
      <div className={styles.emptyWrapper}>
        <img src={EmptyIcon} alt={t("properties:unActiveSearchPage")} />
      </div>
    );
  }

  return (
    <>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.container}>
        <div>
          <p className={styles.title}>{t("main_page:title")}</p>
          <pre className={styles.subTitle}>{t("main_page:sub_title")}</pre>
          <MainSearch />
        </div>
      </div>
    </>
  );
}
