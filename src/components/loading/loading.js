import React from 'react';
import { Spinner } from 'react-bootstrap';

import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.spinnerContainer}>
      <Spinner animation="border" size="xl" className={styles.spinner}/>
    </div>
  );
}
