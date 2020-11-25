import React from 'react';

import styles from './field_row.module.css';

export default function FieldRow({ children }) {
  return (
    <div className={styles.fieldRow}>
      {children}
    </div>
  );
}
