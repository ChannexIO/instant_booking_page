import React from 'react';

import styles from "./hotel_info.module.css";

export default function HotelInfo({ description }) {
  if (!description) {
    return null;
  }

  return (
    <div>
      <pre className={styles.hotelDescription}>{description}</pre>
    </div>  
  );
}