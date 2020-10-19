import React from 'react';

import styles from './section_title.module.css';

export default function SectionTitle({ children }) {
  return (
    <div className={styles.sectionTitle}>
      {children}
    </div>
  );
}
