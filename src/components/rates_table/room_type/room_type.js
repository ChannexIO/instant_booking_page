import React, { useState, useEffect } from 'react';

import RatePlan from './rate_plan';
import RoomInfo from './room_info';

import styles from './room_type.module.css';

export default function RoomType({ roomType, currency, rowIndex, isMobile, ratesOccupancyPerRoom, adults, children, residenceTime, onRatesOccupancyChange }) {
  const [availableSpaces, setAvailableSpaces] = useState(0);
  const [sortedRates, setSortedRates] = useState([]);

  const { ratePlans, availability, id } = roomType;
  const { [id]: roomRates = {} } = ratesOccupancyPerRoom;
  
  const handleRatesOccupancyChange = (updatedRatesOccupancy) => {
    onRatesOccupancyChange({ ...ratesOccupancyPerRoom, [id]: updatedRatesOccupancy });
  };

  useEffect(function updateAvailability() {
    const occupiedSpaces = Object.values(roomRates).reduce((a, b) => a + b, 0);
    const emptySpaces = availability - occupiedSpaces;

    setAvailableSpaces(emptySpaces);
  }, [availability, roomRates]);

  useEffect(function updateRatesPlans() {
    if (!Array.isArray(ratePlans)) {
      return;
    }

    const ratesByOccupancyMatch = ratePlans.sort((a,b) => {
      const aOccupancyMatchRating = Number(a.occupancy.children === children)
        + Number(a.occupancy.adults === adults);

      const bOccupancyMatchRating = Number(b.occupancy.children === children)
      + Number(b.occupancy.adults === adults);

      return bOccupancyMatchRating - aOccupancyMatchRating;
    });

    setSortedRates([...ratesByOccupancyMatch]);
  }, [ratePlans, adults, children]);

  if (!Array.isArray(ratePlans)) {
    return (
      <tr key={id}>
        <RoomInfo roomType={roomType} rowIndex={rowIndex} />
      </tr>
    );
  }

  console.log(sortedRates);
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
              availableSpaces={availableSpaces}
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