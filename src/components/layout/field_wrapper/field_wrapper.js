import React from 'react';

import styles from './field_wrapper.module.css';

export default function FieldWrapper({ children }) {
  return (
    <div className={styles.fieldWrapper}>
      {children}
    </div>
  );
}
