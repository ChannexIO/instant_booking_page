import React from 'react';

import ActionButton from '../action_button';
import PriceBreakdown from '../price_breakdown';
import TotalPrice from '../total_price';

export default function Summary(props) {
  const {
    selectedRatesByRoom,
    isDatesSelected,
    isRateSelected,
    totalPrice,
    currency,
    loading,
    onSearch,
    onBook,
  } = props;

  return (
    <div>
      {isRateSelected && (
        <>
          <PriceBreakdown selectedRatesByRoom={selectedRatesByRoom} currency={currency} />
          <TotalPrice totalPrice={totalPrice} currency={currency} />
        </>
      )}
      <ActionButton
        isDatesSelected={isDatesSelected}
        isRateSelected={isRateSelected}
        total={totalPrice}
        currency={currency}
        loading={loading}
        onBook={onBook}
        onSearch={onSearch}
      />
    </div>
  );
}
