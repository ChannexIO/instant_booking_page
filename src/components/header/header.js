import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import CurrencySelect from 'components/inputs/currency_select';
import LocaleSelect from 'components/inputs/locale_select';

import routes from 'routing/routes';

import HotelLogo from './hotel_logo';
import HotelTitle from './hotel_title';

import styles from './header.module.css';

export default function Header({ property = {} }) {
  const routeMatch = useRouteMatch({
    path: routes.hotelPage,
    strict: true,
  });

  const isCurrencySelectShown = routeMatch.isExact;
  const { title, logo } = property;

  return (
    <div className={styles.header}>
      <div className={styles.titleSection}>
        {logo && <HotelLogo logo={logo} title={title} />}
        <HotelTitle title={title} />
      </div>
      <div className={styles.selectSection}>
        {isCurrencySelectShown && <CurrencySelect />}
        <LocaleSelect />
      </div>
    </div>
  );
}
