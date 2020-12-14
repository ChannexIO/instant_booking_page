import React from 'react';

import CurrencySelect from 'components/inputs/currency_select';
import LocaleSelect from 'components/inputs/locale_select';

import HotelLogo from './hotel_logo';
import HotelTitle from './hotel_title';

import styles from './header.module.css';

export default function Header({ property }) {
  const { title, logo } = property;

  return (
    <div className={styles.header}>
      <div className={styles.titleSection}>
        {logo && <HotelLogo logo={logo} title={title} />}
        <HotelTitle title={title} />
      </div>
      <div className={styles.selectSection}>
        <CurrencySelect />
        <LocaleSelect />
      </div>
    </div>
  );
}
