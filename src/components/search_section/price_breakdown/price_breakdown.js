import React from 'react';

import RoomPriceBreakdown from './room_price_breakdown';
import TaxesBreakdown from './taxes_breakdown';

export default function PriceBreakdown({ selectedRatesByRoom, currency }) {
  return (
    <>
      {Object.keys(selectedRatesByRoom).map((roomId) => (
        <RoomPriceBreakdown
          key={roomId}
          roomWithSelectedRates={selectedRatesByRoom[roomId]}
          currency={currency}
        />
      ))}
      <TaxesBreakdown selectedRatesByRoom={selectedRatesByRoom} currency={currency} />
    </>
  );
}
