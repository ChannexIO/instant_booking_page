import React from 'react';

import Cell from 'components/layout/cell';

import IconGuestChild from 'static/icons-guest-child.svg';
import IconGuestDouble from 'static/icons-guest-double.svg';
import IconGuestSingle from 'static/icons-guest-single.svg';

import OccupancySection from './occupancy_section';

import styles from './rate_plan_occupancy.module.css';

const CHILD_BASE_NUMBER = 1;
const ADULT_BASE_NUMBER = 2;

const getAdditionalSpaces = (spaces, baseAmount) => {
  return spaces > baseAmount ? spaces : null;
};

export default function RatePlanOccupancy({ occupancy, childrenOccupancy }) {
  const { adults, children } = occupancy;
  const additionalChildSpaces = getAdditionalSpaces(children, CHILD_BASE_NUMBER);
  const isChildIconShown = children && childrenOccupancy;
  const additionalAdultsSpaces = getAdditionalSpaces(adults, ADULT_BASE_NUMBER);
  const adultsOccupancyIcon = adults === 2 ? IconGuestDouble : IconGuestSingle;

  return (
    <Cell className={styles.occupancyCell}>
      <div className={styles.occupanciesContainer}>
        <OccupancySection
          type="adults"
          additionalSpaces={additionalAdultsSpaces}
          icon={adultsOccupancyIcon}
        />
        {Boolean(isChildIconShown) && (
          <OccupancySection
            type="children"
            additionalSpaces={additionalChildSpaces}
            icon={IconGuestChild}
          />
        )}
      </div>
    </Cell>
  );
}
