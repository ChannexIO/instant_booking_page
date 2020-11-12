import React, { useEffect, useState } from 'react';

import RatePlanOccupancy from './rate_plan_occupancy';
import RatePlanOccupancySelect from './rate_plan_occupancy_select';
import RatePlanPolicies from './rate_plan_policies';
import RatePlanPrice from './rate_plan_price';

import styles from './rate_plan.module.css';

const DEFAULT_AVAILABLE_SPACES = 0;

export default function RatePlan(props) {
  const {
    ratePlan,
    currency,
    occupiedSpaces,
    ratesOccupancy,
    checkinDate,
    adultsOccupancy,
    childrenOccupancy,
    onOccupancyChange,
  } = props;
  const [availableSpaces, setAvailableSpaces] = useState(DEFAULT_AVAILABLE_SPACES);

  const { id, availability } = ratePlan;
  const { [id]: rateOccupancy = 0 } = ratesOccupancy;

  const handleOccupancyChange = (updatedOccupancy) => {
    onOccupancyChange({ ...ratesOccupancy, [id]: updatedOccupancy });
  };

  useEffect(function updateAvailableSpaces() {
    const updatedAvailableSpaces = availability - occupiedSpaces;

    setAvailableSpaces(updatedAvailableSpaces);
  }, [occupiedSpaces, availability]);

  return (
    <div className={styles.rate}>
      <RatePlanOccupancy
        occupancy={ratePlan.occupancy}
        adultsOccupancy={adultsOccupancy}
        childrenOccupancy={childrenOccupancy}
      />
      <div className={styles.flexibleContainer}>
        <RatePlanPrice ratePlan={ratePlan} currency={currency} />
        <RatePlanPolicies ratePlan={ratePlan} checkinDate={checkinDate} currency={currency} />
      </div>
      <RatePlanOccupancySelect
        rateOccupancy={rateOccupancy}
        availableSpaces={availableSpaces}
        onChange={handleOccupancyChange}
      />
    </div>
  );
}
