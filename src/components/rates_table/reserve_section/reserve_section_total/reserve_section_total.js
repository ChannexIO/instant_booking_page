import React from 'react';
import { useTranslation } from 'react-i18next';

import Currency from 'components/currency';

import styles from './reserve_section_total.module.css';

export default function ReserveSectionTotal({ total, occupiedRoomsNumber, currency }) {
  const { t } = useTranslation();

  if (!occupiedRoomsNumber) {
    return null;
  }

  return (
    <div className={styles.totalContainer}>
      <div className={styles.priceContainer}>
        <div className={styles.roomsAmount}>{`${occupiedRoomsNumber} ${t('rates_table:room_for')}`}</div>
        <Currency className={styles.totalPrice} currency={currency} amount={total} />
      </div>
      <div className={styles.taxesNote}>{t('rates_table:includes_taxes')}</div>
    </div>
  );
}