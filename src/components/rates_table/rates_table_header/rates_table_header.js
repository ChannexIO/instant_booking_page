import React from 'react';
import { useTranslation } from 'react-i18next';

import RatesTableHeaderColumn from './rates_table_header_column';

import styles from './rates_table_header.module.css';

export default function RatesTableHeader({ residenceTime, propertyRooms, isMobile }) {
  const { t } = useTranslation();

  const priceColumnTitle = residenceTime > 1
    ? t('rates_table:price_multiple_nights').replace('{n}', residenceTime)
    : t('rates_table:price');
  const isRatesPresent = propertyRooms.every((room) => Array.isArray(room.ratePlans));

  if (isMobile) {
    return null;
  }

  return (
    <thead>
      <tr className={styles.tableHeaderWrapper}>
        <RatesTableHeaderColumn  className={styles.roomTypeColumn}>{t('rates_table:room_type')}</RatesTableHeaderColumn>
        {isRatesPresent && <>
          <RatesTableHeaderColumn>{t('rates_table:sleeps')}</RatesTableHeaderColumn>
          <RatesTableHeaderColumn>{priceColumnTitle}</RatesTableHeaderColumn>
          <RatesTableHeaderColumn className={styles.policiesColumn}>{t('rates_table:your_choises')}</RatesTableHeaderColumn>
          <RatesTableHeaderColumn>{t('rates_table:select_rooms')}</RatesTableHeaderColumn>
        </>}
      </tr>
    </thead>
  );
}