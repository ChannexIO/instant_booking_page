import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import styles from './info_section.module.css';

export default function InfoSection({ onClear }) {
  const { t } = useTranslation();

  return (
    <div className={styles.infoContainer}>
      <Button
        className={styles.clearButton}
        variant="link"
        onClick={onClear}
      >
        {t('hotel_page:clear')}
      </Button>
    </div>
  );
}
