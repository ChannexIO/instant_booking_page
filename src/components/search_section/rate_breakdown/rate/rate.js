import React from 'react';
import { useTranslation } from 'react-i18next';

import Currency from 'components/currency';
import Cell from 'components/layout/cell';

import Tax from './tax';

import styles from './rate.module.css';

export default function Rate({ room, rate, amount, currency }) {
  const { t } = useTranslation();
  const { totalPrice, lengthOfStay, taxes } = rate;
  const total = Number(totalPrice) * amount;
  const pricePerNight = totalPrice / lengthOfStay;

  return (
    <div>
      <Cell noPadding>
        <div className={styles.title}>
          {room.title}
          <Currency amount={total} currency={currency} />
        </div>
        <div className={styles.details}>
          <Currency amount={pricePerNight} currency={currency} />
          {` × ${amount} ${t('hotel_page:rooms')} × ${lengthOfStay} ${t('hotel_page:nights')}`}
        </div>
      </Cell>
      {taxes.map((tax) => (
        <Tax
          key={`${tax.title}_${tax.amount}`}
          tax={tax}
          currency={currency}
        />
      ))}
    </div>
  );
}
