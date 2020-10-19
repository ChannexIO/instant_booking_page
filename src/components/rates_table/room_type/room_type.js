import React, { useEffect, useState } from 'react';

import RatePlan from './rate_plan';
import RoomInfo from './room_info';

import styles from './room_type.module.css';

const DEFAULT_ROOM_RATES = {};

export default function RoomType({ roomType, currency, rowIndex, isMobile, ratesOccupancyPerRoom, adults, children, residenceTime, onRatesOccupancyChange }) {
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
      const aOccupancyMatchRating = Number(a.occupancy.children === children)
        + Number(a.occupancy.adults === adults);

      const bOccupancyMatchRating = Number(b.occupancy.children === children)
      + Number(b.occupancy.adults === adults);

      return bOccupancyMatchRating - aOccupancyMatchRating;
    });

    setSortedRates([...ratesByOccupancyMatch]);
  }, [ratePlans, adults, children]);

  if (!sortedRates.length) {
    return (
      <tr key={id}>
        <RoomInfo roomType={roomType} rowIndex={rowIndex} />
      </tr>
    );
  }

  return (
    <>
      {sortedRates.map((ratePlan, index, array) => {
        const rowClass = index === (array.length - 1) ? styles.lastRoomRate : null;

        return (
          <tr className={rowClass} key={ratePlan.id}>
            {!index || isMobile ? <RoomInfo roomType={roomType} isMobile={isMobile} rowIndex={rowIndex} /> : null}
            <RatePlan
              ratePlan={ratePlan}
              currency={currency}
              occupiedSpaces={occupiedSpaces}
              ratesOccupancy={roomRates}
              onOccupancyChange={handleRatesOccupancyChange}
              residenceTime={residenceTime}
              isMobile={isMobile}
              adults={adults}
              children={children}
            />
          </tr>
        );
      })}
    </>
  );
}
