import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/buttons/button';
import Currency from 'components/currency';

import styles from './book_button.module.css';

export default function BookButton({ total, currency, disabled, onClick }) {
  const { t } = useTranslation();

  return (
    <Button
      variant="primary"
      disabled={disabled}
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
