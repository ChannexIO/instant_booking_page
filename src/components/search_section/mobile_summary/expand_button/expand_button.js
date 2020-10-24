import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import IconNavigationDown from 'static/icons-navigation-down.svg';
import styles from './expand_button.module.css';

export default function ExpandButton({ expanded, onClick }) {
  const { t } = useTranslation();
  const arrowStyles = [styles.arrowIcon];

  if (expanded) {
    arrowStyles.push(styles.arrowIconInverted);
  }

  return (
    <Button variant="link" className={styles.expandButton} onClick={onClick}>
      <strong>{t('hotel_page:booking_summary')}</strong>
      <img
        src={IconNavigationDown}
        className={arrowStyles.join(' ')}
        alt={t('hotel_page:expand')}
      />
    </Button>
  );
}
