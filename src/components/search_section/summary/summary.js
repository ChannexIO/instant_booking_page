import React from 'react';

import BookButton from '../book_button';
import RateBreakdown from '../rate_breakdown';
import TotalPrice from '../total_price';

export default function Summary({ selectedRatesList, totalPrice, currency }) {
  const isRateSelected = Boolean(selectedRatesList.length);

  return (
    <div>
      {isRateSelected && (
        <>
          <RateBreakdown selectedRatesList={selectedRatesList} currency={currency} />
          <TotalPrice totalPrice={totalPrice} currency={currency} />
        </>
      )}
      <BookButton isRateSelected={isRateSelected} total={totalPrice} currency={currency} />
    </div>
  );
}
