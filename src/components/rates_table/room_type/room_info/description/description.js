import React from "react";
import { useTranslation } from "react-i18next";

import Caption from "components/caption";

import styles from "./description.module.css";

export default function Description({ description,  handleModalToggle }) {
  const { t } = useTranslation();
  if (!description) {
    return null;
  }

  const indices = [];
  for(let i = 0; i < description.length; i++) {
    if (description[i] === " ") indices.push(i);
  }
  const cutoff = indices.filter(x => x > 200)[0];

  if (cutoff) {
    return (
      <Caption>
        {description.slice(0, cutoff)}...
        <br />
        <button className={styles.button} onClick={handleModalToggle}>{t("hotel_page:read_more")}</button>
      </Caption>
    );
  }

  return <Caption>{description}</Caption>;
}
