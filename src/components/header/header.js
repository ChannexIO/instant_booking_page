import React from 'react';

import HotelTitle from 'components/hotel_title';
import CurrencySelect from 'components/inputs/currency_select';
import LocaleSelect from 'components/inputs/locale_select';

import styles from './header.module.css';

export default function Header({ property }) {
  return (
    <div className={styles.header}>
      <div className={styles.titleSection}>
        <HotelTitle property={property} />
      </div>
      <div className={styles.selectSection}>
        <CurrencySelect />
        <LocaleSelect />
      </div>
    </div>
  );
}
