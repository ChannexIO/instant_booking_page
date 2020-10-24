import React from 'react';
import { useTranslation } from 'react-i18next';

import Currency from 'components/currency';

import styles from './min_price_panel.module.css';

export default function MinPricePanel({ property, params }) {
  const { t } = useTranslation();
  const { minPrice = 100 } = property; // TODO - update when added to API
  const { currency } = params;

  return (
    <div className={styles.minPriceContainer}>
      <div className={styles.minPriceContent}>
        {t('hotel_page:price_from')}
        <Currency
          className={styles.minPrice}
          amount={minPrice}
          currency={currency}
        />
        {t('hotel_page:price_per_night')}
      </div>
    </div>
  );
}
