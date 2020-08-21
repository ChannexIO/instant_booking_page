import React from 'react';
import { useTranslation } from 'react-i18next';

import Facility from 'components/faclitily';
import SectionTitle from 'components/section_title';

import styles from './hotel_facilities.module.css';

export default function HotelFacilities({ title, facilities }) {
  const { t } = useTranslation();

  return (
    <div>
      <SectionTitle>{`${t('hotel_page:hotel_facilities')} ${title}`}</SectionTitle>
      <div className={styles.hotelFacilitiesContainer}>
        {facilities.map((facility) => (
          <div className={styles.hotelFacility} key={facility}>
            <Facility code={facility}/>
          </div>
        ))}
      </div>
    </div>
  );
}