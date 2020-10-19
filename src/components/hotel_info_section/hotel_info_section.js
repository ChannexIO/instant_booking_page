import React from 'react';

import HotelLocation from 'components/hotel_location';
import HotelTitle from 'components/hotel_title';

import styles from './hotel_info_section.module.css';

export default function HotelInfoSection({ property }) {
  const { description } = property;

  return (
    <div>
      <div className={styles.hotelTitleSection}>
        <HotelTitle property={property} />
        <HotelLocation property={property} />
      </div>
      {description && <pre className={styles.hotelDescription}>{description}</pre>}
    </div>
  );
}
