import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

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
    <div className={styles.container}>
      <div>
        <p className={styles.title}>The Best Family Booking Site</p>
        <p className={styles.subTitle}>
          We have curated and pre selected the top family friendly hotels in central <br /> London.
          <br />
          All hotels have a lift, breakfast and family rooms.
        </p>

        <MainSearch />
      </div>
    </div>
  );
}
