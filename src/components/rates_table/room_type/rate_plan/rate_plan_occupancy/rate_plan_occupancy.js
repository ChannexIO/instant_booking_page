import React from 'react';
import { useTranslation } from 'react-i18next';

import OccupancySection from './occupancy_section';

import styles from './rate_plan_occupancy.module.css';

export default function RatePlanOccupancy({ occupancy, adults, children, isMobile }) {
  const { t } = useTranslation();

  return (
    <>
      {isMobile && <div className={styles.mobileHeader}>{t('rates_table:price_for_up_to')}:</div>}
      <div className={styles.occupanciesContainer}>
        <OccupancySection availableSpaces={occupancy.adults} selectedSpaces={adults} className={styles.adults}/>
        {Boolean(children) && <OccupancySection availableSpaces={occupancy.children} selectedSpaces={children} className={styles.children}/>}
      </div>
    </>
  );
}