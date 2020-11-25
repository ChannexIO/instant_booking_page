import React from 'react';

import styles from './panel.module.css';

export default function Panel({ title, children }) {
  return (
    <div className={styles.panelContainer}>
      {title && (
        <div className={styles.panelTitle}>
          {title}
        </div>
      )}
      <div className={styles.children}>
        {children}
      </div>
    </div>
  );
}
