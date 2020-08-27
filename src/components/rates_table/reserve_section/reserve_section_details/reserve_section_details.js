import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './reserve_section_details.module.css';

export default function ReserveSectionDetails() {
  const { t } = useTranslation();

  return (
    <ul className={styles.reserveDetails}>
      <li>{t('rates_table:instant_confirmation')}</li>
      <li>{t('rates_table:no_fees')}</li>
      <li>{t('rates_table:no_registration')}</li>
    </ul>
  );
}