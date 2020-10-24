import React from 'react';

import styles from './label.module.css';

export default function Label({ children }) {
  return (
    <div className={styles.label}>
      {children}
    </div>
  );
}
