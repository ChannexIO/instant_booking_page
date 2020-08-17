import React from 'react';
import { useTranslation } from "react-i18next";

import SectionTitle from "components/section_title";

import styles from "./hotel_info.module.css";

export default function HotelInfo({ description }) {
  const { t } = useTranslation();

  if (!description) {
    return null;
  }

  return (
    <div>
      <SectionTitle>{t("hotel_page:hotel_info")}</SectionTitle>
      <pre className={styles.hotelDescription}>{description}</pre>
    </div>  
  );
}