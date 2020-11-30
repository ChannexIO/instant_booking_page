import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Overlay from 'components/layout/overlay';

import styles from './loading_container.module.css';

export default function LoadingContainer({ loading, children }) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Overlay active={loading}>
        <Spinner animation="border" size="xl"/>
        <div className={styles.overlayText}>
          {t('global:loading')}
        </div>
      </Overlay>
      {children}
    </div>
  );
}
