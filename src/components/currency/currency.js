import React from 'react';
import currencies from 'world-currencies';

const DECIMAL_PLACES = 2;

export default function Currency({ amount, currency, className }) {
  const activeCurrencyInfo = currencies[currency];
  const currencySymbol = activeCurrencyInfo.units.major.symbol;
  const fixedAmount = Number(amount).toFixed(DECIMAL_PLACES);

  return (
    <span className={className} >{`${currencySymbol} ${fixedAmount}`}</span>
  );
}
