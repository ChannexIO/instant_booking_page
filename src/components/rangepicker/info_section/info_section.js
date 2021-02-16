import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/buttons/button';

import styles from './info_section.module.css';

export default function InfoSection({ onClear, onClose }) {
  const { t } = useTranslation();

  return (
    <div className={styles.infoContainer}>
      <Button
        className={styles.button}
        variant="light"
        onClick={onClear}
      >
        {t('global:clear')}
      </Button>
      <Button
        className={styles.button}
        variant="light"
        onClick={onClose}
      >
        {t('global:close')}
      </Button>
    </div>
  );
}
