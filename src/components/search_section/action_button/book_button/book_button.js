import React from 'react';
import { useTranslation } from 'react-i18next';

import Currency from 'components/currency';
import Button from "components/button";

import styles from './book_button.module.css';

export default function BookButton({ total, currency, onClick }) {
  const { t } = useTranslation();

  return (
    <Button
      variant="primary"
      onClick={onClick}
    >
      <>
        <span className={styles.buttonCaption}>
          {t('hotel_page:book_for')}
        </span>
        <Currency amount={total} currency={currency}/>
      </>
  </Button>
  );
}
