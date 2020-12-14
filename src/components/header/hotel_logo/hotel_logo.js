import React from 'react';

import styles from './hotel_logo.module.css';

export default function HotelLogo({ logo, title }) {
  return (
    <div className={styles.logoContainer}>
      <img
        className={styles.logo}
        src={`${logo}-/resize/80x80/80.jpg`}
        alt={title}
      />
    </div>
  );
}
