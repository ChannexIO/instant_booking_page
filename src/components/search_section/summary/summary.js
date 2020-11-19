import React from 'react';

import ActionButton from '../action_button';
import PriceBreakdown from '../price_breakdown';
import TotalPrice from '../total_price';

export default function Summary({ selectedRatesByRoom, totalPrice, currency, loading, onSearch }) {
  const isRateSelected = Boolean(Object.keys(selectedRatesByRoom).length);

  return (
    <div>
      {isRateSelected && (
        <>
          <PriceBreakdown selectedRatesByRoom={selectedRatesByRoom} currency={currency} />
          <TotalPrice totalPrice={totalPrice} currency={currency} />
        </>
      )}
      <ActionButton
        isRateSelected={isRateSelected}
        total={totalPrice}
        currency={currency}
        loading={loading}
        onSearch={onSearch}
      />
    </div>
  );
}
