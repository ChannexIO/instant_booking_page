import React from 'react';

import RatePlanOccupancy from './rate_plan_occupancy';
import RatePlanPrice from './rate_plan_price';
import RatePlanPolicies from './rate_plan_policies';
import RatePlanOccupancySelect from './rate_plan_occupancy_select';

export default function RatePlan({ ratePlan, currency, availableSpaces, ratesOccupancy, adults, children, onOccupancyChange }) {
  const { id } = ratePlan;
  const { [id]: rateOccupancy = 0 } = ratesOccupancy;

  const handleOccupancyChange = (updatedOccupancy) => {
    onOccupancyChange({...ratesOccupancy, [id]: updatedOccupancy });
  };

  return (
    <>
      <td><RatePlanOccupancy occupancy={ratePlan.occupancy} adults={adults} children={children}/></td>
      <td><RatePlanPrice ratePlan={ratePlan} currency={currency} /></td>
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