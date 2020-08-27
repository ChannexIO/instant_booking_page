import React from 'react';

import styles from './policy_section.module.css';

export default function PolicySection({ title, text }) {
  return (
    <div className={styles.sectionContainer}>
      <span className={styles.sectionTitle}>{title}:</span>
      <span className={styles.sectionText}>{text}</span>
    </div>
  );
}