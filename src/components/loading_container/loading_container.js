import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import styles from './loading_container.module.css';

export default function LoadingContainer({ loading, children }) {
  const { t } = useTranslation();

  if (!loading) {
    return children;
  }

  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div className={styles.overlayContent}>
          <Spinner animation="border" size="xl"/>
          <div className={styles.overlayText}>
            {t('global:loading')}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
