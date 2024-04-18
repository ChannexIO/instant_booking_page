import React from "react";
import { useTranslation } from "react-i18next";

import Link from "components/link";

import styles from "./get_channel_ad.module.css";

export default function GetChannelAd() {
  const { t } = useTranslation();
  const host = window.location.host;
  let url;
  let title;

  if (host.indexOf("easy-rez.com") > -1) {
    url = "https://easy-rez.com";
    title = "easy-rez";
  }

  if (url) {
    return (
      <div className={styles.container}>
        <span className={styles.text}>{t("footer:get_free_channel")}</span>
        <Link to={url} target="_blank">
          {title}
        </Link>
      </div>
    );
  }
  return null;
}
