import React from "react";

import styles from "./rates_table_header_column.module.css";

export default function RatesTableHeaderColumn({ className, children }) {
  return (
    <div className={[styles.column, className].join(" ")}>
      <span className={styles.columnContent}>
        <span className={styles.columnLabel}>{children}</span>
      </span>
    </div>
  );
}
