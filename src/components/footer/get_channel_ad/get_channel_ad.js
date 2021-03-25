import React from "react";
import { useTranslation } from "react-i18next";

import Link from "components/link";

import styles from "./get_channel_ad.module.css";

export default function GetChannelAd() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <span className={styles.text}>{t("footer:get_free_channel")}</span>
      <Link to="https://channex.io">{t("footer:channex_io")}</Link>
    </div>
  );
}
