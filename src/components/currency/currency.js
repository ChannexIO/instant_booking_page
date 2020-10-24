import React from 'react';

const DECIMAL_PLACES = 2;

export default function Currency({ amount, currency, className }) {
  const fixedAmount = Number(amount).toFixed(DECIMAL_PLACES);

  return (
    <span className={className} >{`${fixedAmount} ${currency}`}</span>
  );
}
