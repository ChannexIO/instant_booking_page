import React from 'react';

import styles from './field_error.module.css';

export default function FieldError({ message }) {
  return (
    <span className={styles.message}>
      {message}
    </span>
  );
}
