import React from 'react';

import BookButton from '../book_button';
import PriceBreakdown from '../price_breakdown';
import TotalPrice from '../total_price';

export default function Summary({ selectedRatesByRoom, totalPrice, currency }) {
  const isRateSelected = Boolean(Object.keys(selectedRatesByRoom).length);

  return (
    <div>
      {isRateSelected && (
        <>
          <PriceBreakdown selectedRatesByRoom={selectedRatesByRoom} currency={currency} />
          <TotalPrice totalPrice={totalPrice} currency={currency} />
        </>
      )}
      <BookButton isRateSelected={isRateSelected} total={totalPrice} currency={currency} />
    </div>
  );
}
