import React from 'react';

import OccupancySection from './occupancy_section';

import styles from './rate_plan_occupancy.module.css';

export default function RatePlanOccupancy({ occupancy, adults, children }) {
  return (
    <div className={styles.occupanciesContainer}>
      <OccupancySection availableSpaces={occupancy.adults} selectedSpaces={adults} className={styles.adults}/>
      {Boolean(children) && <OccupancySection availableSpaces={occupancy.children} selectedSpaces={children} className={styles.children}/>}
    </div>
  );
}