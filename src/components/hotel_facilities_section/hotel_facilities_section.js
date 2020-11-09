import React from 'react';
import { useTranslation } from 'react-i18next';

import Facility from 'components/faclitily';
import SectionWrapper from 'components/layout/section_wrapper';
import SectionTitle from 'components/section_title';

import styles from './hotel_facilities_section.module.css';

export default function HotelFacilitiesSection({ property }) {
  const { facilities } = property;
  const { t } = useTranslation();

  return (
    <SectionWrapper theme="light">
      <SectionTitle>{t('hotel_page:hotel_facilities')}</SectionTitle>
      <div className={styles.hotelFacilitiesContainer}>
        {facilities.map((facility) => (
          <div className={styles.hotelFacility} key={facility}>
            <Facility code={facility}/>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
