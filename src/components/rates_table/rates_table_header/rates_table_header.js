import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import PriceColumnTitle from 'components/rates_table/price_column_title';

import RatesTableHeaderColumn from './rates_table_header_column';

import styles from './rates_table_header.module.css';

export default function RatesTableHeader({ checkinDate, checkoutDate, propertyRooms }) {
  const { t } = useTranslation();
  const isCheckinDateValid = checkinDate && moment(checkinDate).isValid();
  const isCheckoutDateValid = checkoutDate && moment(checkoutDate).isValid();
  const isEnteredDatesValid = isCheckinDateValid && isCheckoutDateValid;
  const residenceTime = isEnteredDatesValid
    ? checkoutDate.diff(checkinDate, 'days')
    : null;

  const isRatesPresent = propertyRooms.some((room) => {
    return Array.isArray(room.ratePlans) && room.ratePlans.length > 0;
  });

  return (
    <div className={styles.tableHeaderWrapper}>
      <RatesTableHeaderColumn>{t('rates_table:room_type')}</RatesTableHeaderColumn>
      {isRatesPresent && <>
        <RatesTableHeaderColumn className={styles.columnNarrow}>
          {t('rates_table:sleeps')}
        </RatesTableHeaderColumn>
        <RatesTableHeaderColumn>
          <PriceColumnTitle residenceTime={residenceTime} />
        </RatesTableHeaderColumn>
        <RatesTableHeaderColumn>
          {t('rates_table:your_choises')}
        </RatesTableHeaderColumn>
        <RatesTableHeaderColumn className={styles.columnNarrow}>
          {t('rates_table:rooms')}
        </RatesTableHeaderColumn>
      </>}
    </div>
  );
}
