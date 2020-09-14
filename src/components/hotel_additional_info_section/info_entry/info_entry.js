import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import styles from './info_entry.module.css';

export default function InfoEntry({ name, children }) {
  const { t } = useTranslation();

  return (
    <Row className={styles.infoEntry}>
      <Col sm={3} xs={12} className={styles.infoEntryTitle}>
        {t(`hotel_page:${name}`)}
      </Col>
      <Col sm={9} xs={12} className={styles.infoEntryText}>
        {children}
      </Col>
    </Row>
  );
}