import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import styles from './room_availability.module.css';

const MAX_AVAILABILITY_TO_SHOW = 3;

export default function RoomAvailability({ availability }) {
  const { t } = useTranslation();

  if (!availability || availability > MAX_AVAILABILITY_TO_SHOW) {
    return null;
  }

  return (
    <div className={styles.roomAvailability}>
      <ClockCircleOutlined className={styles.roomAvailabilityIcon} />
      <div className={styles.roomAvailabilityMessage}>
        {t('rates_table:room_availability').replace('{n}', availability)}
      </div>
    </div>
  );
}