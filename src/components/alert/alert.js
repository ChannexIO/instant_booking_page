import React from 'react';

import styles from './alert.module.css';

const ALERT_VARIANTS = {
  error: styles.error,
  success: styles.success,
  info: styles.info,
};

export default function Alert({ text, variant }) {
  const alertClasses = [styles.alert];
  const modifier = ALERT_VARIANTS[variant];

  if (modifier) {
    alertClasses.push(modifier);
  }

  return (
    <div className={alertClasses.join(' ')}>
      <div>
        {text}
      </div>
    </div>
  );
}
