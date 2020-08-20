import React, { useState, useEffect } from 'react';
import RatePlan from "./rate_plan";
import RoomInfo from "./room_info";

export default function RoomType({ roomType, currency, rowIndex, isMobile, ratesOccupancyPerRoom, onRatesOccupancyChange }) {
  const [availableSpaces, setAvailableSpaces] = useState(0);

  const { ratePlans, availability, id } = roomType;
  const { [id]: roomRates = {} } = ratesOccupancyPerRoom;
  
  const handleRatesOccupancyChange = (updatedRatesOccupancy) => {
    onRatesOccupancyChange({ ...ratesOccupancyPerRoom, [id]: updatedRatesOccupancy });
  };

  useEffect(function updateAvailability() {
    const occupiedSpaces = Object.values(roomRates).reduce((a, b) => a + b, 0);
    const emptySpaces = availability - occupiedSpaces;

    setAvailableSpaces(emptySpaces);
  }, [roomRates]);

  if (!Array.isArray(ratePlans)) {
    return (
      <tr key={id}>
        <RoomInfo roomType={roomType} rowIndex={rowIndex} />
      </tr>
    );
  }

  return (
    <>
      {ratePlans.map((ratePlan, index) => (
        <tr key={ratePlan.id}>
          {!index || isMobile ? <RoomInfo roomType={roomType} isMobile={isMobile} rowIndex={rowIndex} /> : null}
          <RatePlan
            ratePlan={ratePlan}
            currency={currency}
            availableSpaces={availableSpaces}
            ratesOccupancy={roomRates}
            onOccupancyChange={handleRatesOccupancyChange}
          />
        </tr>
      ))}
    </>
  )
}