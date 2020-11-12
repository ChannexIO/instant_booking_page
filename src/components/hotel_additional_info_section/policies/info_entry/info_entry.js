import React from 'react';

import Label from 'components/label';

import styles from './info_entry.module.css';

export default function InfoEntry({ title, text }) {
  return (
    <div className={styles.container}>
      <Label className={styles.label}>
        {title}
      </Label>
      <div className={styles.content}>
        {text}
      </div>
    </div>
  );
}
