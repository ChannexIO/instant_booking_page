import React from 'react';

import Cell from 'components/layout/cell';

import IconGuestChild from 'static/icons-guest-child.svg';
import IconGuestDouble from 'static/icons-guest-double.svg';
import IconGuestSingle from 'static/icons-guest-single.svg';

import OccupancySection from './occupancy_section';

import styles from './rate_plan_occupancy.module.css';

const CHILD_NUMBER_THRESHOLD = 1;
const ADULT_NUMBER_THRESHOLD = 2;

export default function RatePlanOccupancy({ occupancy, childrenOccupancy }) {
  const isChildOccupancyNumberShown = occupancy.children > CHILD_NUMBER_THRESHOLD;
  const isAdultOccupancyNumberShown = occupancy.adults > ADULT_NUMBER_THRESHOLD;
  const adultsOccupancyIcon = occupancy.adults > 1 ? IconGuestDouble : IconGuestSingle;

  return (
    <Cell className={styles.occupancyCell}>
      <div className={styles.occupanciesContainer}>
        <OccupancySection
          type="adults"
          availableSpaces={occupancy.adults}
          icon={adultsOccupancyIcon}
          showNumber={isAdultOccupancyNumberShown}
        />
        {Boolean(childrenOccupancy) && (
          <OccupancySection
            type="children"
            availableSpaces={occupancy.children}
            icon={IconGuestChild}
            showNumber={isChildOccupancyNumberShown}
          />
        )}
      </div>
    </Cell>
  );
}
