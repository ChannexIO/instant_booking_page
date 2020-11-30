import React from 'react';

import styles from './overlay.module.css';

export default function Overlay({ active, children }) {
  const overlayStyle = [styles.overlay];

  if (!active) {
    overlayStyle.push(styles.hiddenOverlay);
  }

  return (
    <div className={overlayStyle.join(' ')}>
      <div className={styles.overlayContent}>
        {children}
      </div>
    </div>
  );
}
