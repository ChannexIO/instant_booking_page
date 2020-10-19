import React from 'react';

import styles from './policy.module.css';

export default function Policy({ icon, title, addon, isHighlighted }) {
  const containerClass = isHighlighted ? styles.highlighted : styles.common;

  return (
    <div className={containerClass}>
      <div className={styles.mainSection}>
        {icon}
        <span className={styles.title}>
          {title}
        </span>
      </div>
      {addon && <span className={styles.addonSection}>
        {addon}
      </span>}
    </div>

  );
}
