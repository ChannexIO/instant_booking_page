import React from 'react';

import HotelLocation from 'components/hotel_location';
import SectionWrapper from 'components/layout/section_wrapper';
import SectionTitle from 'components/section_title';

import { HOTEL_INFO_SECTION } from 'constants/element_ids';

import styles from './hotel_info_section.module.css';

export default function HotelInfoSection({ property }) {
  const { description, title } = property;

  return (
    <SectionWrapper id={HOTEL_INFO_SECTION} theme="light">
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
    </SectionWrapper>
  );
}
