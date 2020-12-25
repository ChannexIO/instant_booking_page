import React from 'react';

import styles from './panel.module.css';

export default function Panel({ title, addOn, children }) {
  return (
    <div className={styles.panelContainer}>
      <div className={styles.panelTitle}>
        <span>
          {title}
        </span>
        <span>
          {addOn}
        </span>
      </div>
      <div className={styles.children}>
        {children}
      </div>
    </div>
  );
}
