import React from 'react';

import styles from './caption.module.css';

const CAPTION_VARIANTS = {
  right: styles.captionRight,
  center: styles.captionCenter,
  green: styles.captionGreen,
};

export default function Caption({ children, variant }) {
  const captionClasses = [styles.caption];
  const modifierClass = CAPTION_VARIANTS[variant];

  if (modifierClass) {
    captionClasses.push(modifierClass);
  }

  return (
    <div className={captionClasses.join(' ')}>
      {children}
    </div>
  );
}
