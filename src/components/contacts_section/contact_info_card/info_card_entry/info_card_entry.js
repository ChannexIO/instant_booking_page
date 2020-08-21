import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './info_card_entry.module.css';

export default function InfoCardEntry({ name, children }) {
  const { t } = useTranslation();

  return (
    <div className={styles.infoEntry}>
      <div className={styles.infoEntryTitle}>{t(`hotel_page:${name}`)}:</div>
      {children}
    </div>
  );
}