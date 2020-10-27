import React from 'react';
import { useTranslation } from 'react-i18next';

import Label from 'components/label';

import styles from './info_entry.module.css';

export default function InfoEntry({ name, children }) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Label className={styles.label}>
        {t(`hotel_page:${name}`)}
      </Label>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
