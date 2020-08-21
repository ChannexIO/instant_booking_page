import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import styles from './search_button.module.css';

export default function SearchButton({ onClick }) {
  const { t } = useTranslation();

  return (
    <Button
      variant="primary"
      className={styles.button}
      onClick={onClick}
    >
      {t('hotel_page:search')}
    </Button>
  );
}