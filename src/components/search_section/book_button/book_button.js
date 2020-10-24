import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Currency from 'components/currency';

import styles from './book_button.module.css';

export default function SearchButton({ onClick, isRateSelected, total, currency }) {
  const { t } = useTranslation();

  const buttonTitle = isRateSelected ? (
    <>
      <span className={styles.buttonCaption}>
        {t('hotel_page:book_for')}
      </span>
      <Currency amount={total} currency={currency}/>
    </>
  ) : t('hotel_page:book');

  return (
    <div className={styles.buttonContainer}>
      <Button
        variant="primary"
        disabled={!isRateSelected}
        className={styles.button}
        onClick={onClick}
      >
        {buttonTitle}
      </Button>
    </div>
  );
}
