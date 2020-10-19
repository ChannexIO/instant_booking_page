import React from 'react';
import { useTranslation } from 'react-i18next';
import { ClockCircleOutlined } from '@ant-design/icons';

import styles from './room_availability.module.css';

const MAX_AVAILABILITY_TO_SHOW = 3;

export default function RoomAvailability({ availability }) {
  const { t } = useTranslation();

  if (!availability || availability > MAX_AVAILABILITY_TO_SHOW) {
    return null;
  }

  const containerClass = availability === 1 ? styles.roomAvailabilityHighlighted : styles.roomAvailability;

  return (
    <div className={containerClass}>
      <ClockCircleOutlined className={styles.roomAvailabilityIcon} />
      <div className={styles.roomAvailabilityMessage}>
        {t('rates_table:room_availability').replace('{n}', availability)}
      </div>
    </div>
  );
}
