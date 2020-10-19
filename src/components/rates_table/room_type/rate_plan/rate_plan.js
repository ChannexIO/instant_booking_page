import React, { useEffect, useState } from 'react';

import RatePlanOccupancy from './rate_plan_occupancy';
import RatePlanOccupancySelect from './rate_plan_occupancy_select';
import RatePlanPolicies from './rate_plan_policies';
import RatePlanPrice from './rate_plan_price';

const DEFAULT_AVAILABLE_SPACES = 0;

export default function RatePlan({ ratePlan, currency, occupiedSpaces, ratesOccupancy, residenceTime, isMobile, adults, children, onOccupancyChange }) {
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
    <>
      <td><RatePlanOccupancy occupancy={ratePlan.occupancy} adults={adults} children={children} isMobile={isMobile} /></td>
      <td><RatePlanPrice ratePlan={ratePlan} currency={currency} residenceTime={residenceTime} isMobile={isMobile} /></td>
      <td><RatePlanPolicies ratePlan={ratePlan} currency={currency} /></td>
      <td>
        <RatePlanOccupancySelect
          rateOccupancy={rateOccupancy}
          availableSpaces={availableSpaces}
          onChange={handleOccupancyChange}
        />
      </td>
    </>
  );
}
