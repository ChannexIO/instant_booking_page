import React, { useContext, useEffect, useState } from "react";

import { BookingDataContext } from "containers/data_context";

import RatePlanOccupancy from "./rate_plan_occupancy";
import RatePlanOccupancySelect from "./rate_plan_occupancy_select";
import RatePlanPolicies from "./rate_plan_policies";
import RatePlanPrice from "./rate_plan_price";

import styles from "./rate_plan.module.css";

const DEFAULT_AVAILABLE_SPACES = 0;

export default function RatePlan(props) {
  const { property } = useContext(BookingDataContext);
  const {
    ratePlan,
    currency,
    disabled,
    occupiedSpaces,
    ratesOccupancy,
    checkinDate,
    adultsOccupancy,
    childrenOccupancy,
    onOccupancyChange,
  } = props;
  const [availableSpaces, setAvailableSpaces] = useState(DEFAULT_AVAILABLE_SPACES);

  const { hotelPolicy = {} } = property.data;
  const { id, availability } = ratePlan;
  const { [id]: rateOccupancy = 0 } = ratesOccupancy;

  const handleOccupancyChange = (updatedOccupancy) => {
    onOccupancyChange({ ...ratesOccupancy, [id]: updatedOccupancy });
  };

  useEffect(
    function updateAvailableSpaces() {
      const updatedAvailableSpaces = availability - occupiedSpaces;

      setAvailableSpaces(updatedAvailableSpaces);
    },
    [occupiedSpaces, availability],
  );

  return (
    <div className={styles.rate}>
      <RatePlanOccupancy
        occupancy={ratePlan.occupancy}
        adultsOccupancy={adultsOccupancy}
        childrenOccupancy={childrenOccupancy}
      />
      <div className={styles.flexibleContainer}>
        <RatePlanPrice ratePlan={ratePlan} currency={currency} />
        <RatePlanPolicies ratePlan={ratePlan} checkinDate={checkinDate} hotelPolicy={hotelPolicy} />
      </div>
      <RatePlanOccupancySelect
        disabled={disabled}
        rateOccupancy={rateOccupancy}
        availableSpaces={availableSpaces}
        onChange={handleOccupancyChange}
      />
    </div>
  );
}
