import React from 'react';

import styles from './hotel_title.module.css';

export default function HotelTitle({ title }) {
  return (
    <div className={styles.hotelTitle}>
      {title}
    </div>
  );
}
