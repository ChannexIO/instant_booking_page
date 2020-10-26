import React from 'react';

import HotelLocation from 'components/hotel_location';
import SectionTitle from 'components/section_title';

import styles from './hotel_info_section.module.css';

export default function HotelInfoSection({ property }) {
  const { description, title } = property;

  return (
    <div>
      <div className={styles.hotelTitleSection}>
        <SectionTitle>
          {title}
        </SectionTitle>
        <HotelLocation property={property} />
      </div>
      {description && (
        <pre className={styles.hotelDescription}>
          {description}
        </pre>
      )}
    </div>
  );
}
