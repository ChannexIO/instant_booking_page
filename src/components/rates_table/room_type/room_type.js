import React, { useEffect, useState } from 'react';

import NoRatesPlaceholder from './no_rates_placeholder';
import RatePlan from './rate_plan';
import RoomInfo from './room_info';

import styles from './room_type.module.css';

const DEFAULT_ROOM_RATES = {};

export default function RoomType(props) {
  const {
    roomType,
    currency,
    rowIndex,
    ratesOccupancyPerRoom,
    adultsOccupancy,
    childrenOccupancy,
    onRatesOccupancyChange,
  } = props;
  const [occupiedSpaces, setOccupiedSpaces] = useState(0);
  const [sortedRates, setSortedRates] = useState([]);

  const { ratePlans, id } = roomType;
  const { [id]: roomRates = DEFAULT_ROOM_RATES } = ratesOccupancyPerRoom;

  const handleRatesOccupancyChange = (updatedRatesOccupancy) => {
    onRatesOccupancyChange({ ...ratesOccupancyPerRoom, [id]: updatedRatesOccupancy });
  };

  useEffect(function updateAvailability() {
    const updatedOccupiedSpaces = Object.values(roomRates).reduce((a, b) => a + b, 0);

    setOccupiedSpaces(updatedOccupiedSpaces);
  }, [roomRates]);

  useEffect(function updateRatesPlans() {
    if (!Array.isArray(ratePlans)) {
      return;
    }

    const ratesByOccupancyMatch = ratePlans.sort((a, b) => {
      const aOccupancyMatchRating = Number(a.occupancy.children === childrenOccupancy)
        + Number(a.occupancy.adults === adultsOccupancy);

      const bOccupancyMatchRating = Number(b.occupancy.children === childrenOccupancy)
        + Number(b.occupancy.adults === adultsOccupancy);

      return bOccupancyMatchRating - aOccupancyMatchRating;
    });

    setSortedRates([...ratesByOccupancyMatch]);
  }, [ratePlans, adultsOccupancy, childrenOccupancy]);

  return (
    <div className={styles.roomContainer}>
      <RoomInfo roomType={roomType} rowIndex={rowIndex} />
      <div className={styles.ratesList}>
        {sortedRates.map((ratePlan) => {
          return (
            <RatePlan
              key={ratePlan.id}
              ratePlan={ratePlan}
              currency={currency}
              occupiedSpaces={occupiedSpaces}
              ratesOccupancy={roomRates}
              onOccupancyChange={handleRatesOccupancyChange}
              adultsOccupancy={adultsOccupancy}
              childrenOccupancy={childrenOccupancy}
            />
          );
        })}
        {!sortedRates.length && (
          <NoRatesPlaceholder />
        )}
        </div>
      </div>
  );
}
