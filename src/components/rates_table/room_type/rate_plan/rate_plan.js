import React from 'react';
import { useTranslation } from "react-i18next";

import RatePlanOccupancy from "./rate_plan_occupancy";
import RatePlanPrice from "./rate_plan_price";
import RatePlanCancellationPolicy from "./rate_plan_cancellation_policy";
import RatePlanOccupancySelect from "./rate_plan_occupancy_select";

export default function RatePlan({ ratePlan, currency, availableSpaces, ratesOccupancy, onOccupancyChange }) {
  const { t } = useTranslation();
  const { id } = ratePlan;
  const { [id]: rateOccupancy = 0 } = ratesOccupancy;

  const handleOccupancyChange = (updatedOccupancy) => {
    onOccupancyChange({...ratesOccupancy, [id]: updatedOccupancy });
  }

  return (
    <>
      <td><RatePlanOccupancy occupancy={ratePlan.occupancy} /></td>
      <td><RatePlanPrice ratePlan={ratePlan} currency={currency} /></td>
      <td><RatePlanCancellationPolicy ratePlan={ratePlan} /></td>
      <td>
        <RatePlanOccupancySelect
          rateOccupancy={rateOccupancy}
          availableSpaces={availableSpaces}
          onChange={handleOccupancyChange}
        />
      </td>
    </>
  )
}