import React from 'react';

import ActionButton from '../action_button';
import MissingSpaces from '../missing_spaces';
import PriceBreakdown from '../price_breakdown';
import TotalPrice from '../total_price';

export default function Summary(props) {
  const {
    selectedRatesByRoom,
    isDatesSelected,
    isRateSelected,
    missingSpaces,
    bookingParams,
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
          <MissingSpaces missingSpaces={missingSpaces}/>
        </>
      )}
      <ActionButton
        isDatesSelected={isDatesSelected}
        isRateSelected={isRateSelected}
        missingSpaces={missingSpaces}
        total={totalPrice}
        currency={currency}
        loading={loading}
        onBook={onBook}
        onSearch={onSearch}
      />
    </div>
  );
}
