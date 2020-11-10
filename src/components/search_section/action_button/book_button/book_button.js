import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Currency from 'components/currency';

import styles from './book_button.module.css';

export default function BookButton({ total, currency, onClick }) {
  const { t } = useTranslation();

  return (
    <Button
    variant="primary"
    className={styles.button}
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
