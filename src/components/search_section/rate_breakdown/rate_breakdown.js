import React from 'react';

import Rate from './rate';

export default function RateBreakdown({ selectedRatesList, currency }) {
  return (
    <>
      {selectedRatesList.map(({ room, rate, amount }) => (
        <Rate
          key={`${room.id}_${rate.id}`}
          room={room}
          rate={rate}
          amount={amount}
          currency={currency}
        />
      ))}
    </>
  );
}
