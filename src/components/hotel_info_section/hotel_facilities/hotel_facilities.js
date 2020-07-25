import React from 'react';
import { useTranslation } from "react-i18next";

import styles from "./hotel_facilities.module.css";

export default function HotelFacilities({ title, facilities }) {
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.hotelFacilitiesTitle}>{`${t("hotel_page:hotel_facilities")} ${title}:`}</div>
      !facilities here!
    </div>
  );
}