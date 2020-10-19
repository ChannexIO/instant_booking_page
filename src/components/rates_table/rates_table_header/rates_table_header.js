import React from 'react';
import { useTranslation } from 'react-i18next';

import PriceColumnTitle from 'components/rates_table/price_column_title';

import RatesTableHeaderColumn from './rates_table_header_column';

import styles from './rates_table_header.module.css';

export default function RatesTableHeader({ residenceTime, propertyRooms, isMobile }) {
  const { t } = useTranslation();

  const isRatesPresent = propertyRooms.some((room) => Array.isArray(room.ratePlans) && room.ratePlans.length > 0);
  const roomTypeColumnClass = isRatesPresent ? styles.roomTypeColumn : styles.roomTypeColumnWide;

  if (isMobile) {
    return null;
  }

  return (
    <thead>
      <tr className={styles.tableHeaderWrapper}>
        <RatesTableHeaderColumn className={roomTypeColumnClass}>{t('rates_table:room_type')}</RatesTableHeaderColumn>
        {isRatesPresent && <>
          <RatesTableHeaderColumn>{t('rates_table:sleeps')}</RatesTableHeaderColumn>
          <RatesTableHeaderColumn><PriceColumnTitle residenceTime={residenceTime} /></RatesTableHeaderColumn>
          <RatesTableHeaderColumn className={styles.policiesColumn}>{t('rates_table:your_choises')}</RatesTableHeaderColumn>
          <RatesTableHeaderColumn>{t('rates_table:select_rooms')}</RatesTableHeaderColumn>
        </>}
      </tr>
    </thead>
  );
}
