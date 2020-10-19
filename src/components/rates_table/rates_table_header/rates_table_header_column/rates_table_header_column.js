import React from 'react';

import styles from './rates_table_header_column.module.css';

export default function RatesTableHeaderColumn({ className, children }) {
  return (
    <th className={[styles.column, className].join(' ')}>
      <span className={styles.columnContent}>
        {children}
      </span>
    </th>
  );
}
