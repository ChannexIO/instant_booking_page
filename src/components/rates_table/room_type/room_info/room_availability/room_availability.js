import React from 'react';
import { ClockCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import styles from "./room_availability.module.css";

export default function RoomAvailability({ availability }) {
  const { t } = useTranslation();

  return (
    <div className={styles.roomAvailability}>
      <ClockCircleOutlined className={styles.roomAvailabilityIcon} />
      <div className={styles.roomAvailabilityMessage}>
        {t("rates_table:room_availability").replace("{n}", availability)}
      </div>
    </div>
  );
}