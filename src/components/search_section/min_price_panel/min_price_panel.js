import React from 'react';
import { useTranslation } from 'react-i18next';

import Currency from 'components/currency';

import { HOTEL_INFO_SECTION } from 'constants/element_ids';

import styles from './min_price_panel.module.css';

const handleClick = (e) => {
  e.preventDefault();
  const hotelInfoSection = document.getElementById(HOTEL_INFO_SECTION);

  if (!hotelInfoSection) {
    return;
  }

  hotelInfoSection.scrollIntoView({ behavior: 'smooth' });
};

export default function MinPricePanel({ property, params }) {
  const { t } = useTranslation();
  const { minPrice = 100 } = property; // TODO - update when added to API
  const { currency } = params;

  return (
    <a className={styles.minPriceContainer} href="/" onClick={handleClick}>
      <div className={styles.minPriceContent}>
        {t('hotel_page:price_from')}
        <Currency
          className={styles.minPrice}
          amount={minPrice}
          currency={currency}
        />
        {t('hotel_page:price_per_night')}
      </div>
    </a>
  );
}
