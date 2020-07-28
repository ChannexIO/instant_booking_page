import React from 'react';
import { useTranslation } from "react-i18next";

import getBedIconByCode from "utils/get_bed_icon_by_code";

import styles from "./bed_type.module.css";

export default function BedType({ roomType, bedType, value }) {
  const { t } = useTranslation();
  const Icon = getBedIconByCode(bedType);

  return (
    <div className={styles.bed}>
      <div className={styles.roomTitle}>
        {t(`room_types:${roomType}`)}: 
      </div>
      <div className={styles.bedTitle}>
        {`${value} ${t(`bed_types:${bedType}`)}`}
      </div>
      <Icon className={styles.bedIcon} />
    </div>
  );}