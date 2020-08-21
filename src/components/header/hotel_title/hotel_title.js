import React from 'react';

import styles from './hotel_title.module.css';

export default function HotelTitle({ property }) {
  return (
    <div className={styles.hotelTitle}>{property.title}</div>
  );
}