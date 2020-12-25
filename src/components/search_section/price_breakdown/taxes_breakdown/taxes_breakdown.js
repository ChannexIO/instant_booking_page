import React, { useEffect, useState } from 'react';

import Tax from './tax';

// TODO - update per person tax calculation
const calculateTaxValue = ({ amount, mode, multiplier }) => {
  const parsedAmount = Number(amount);

  switch (mode) {
    case 'percent':
      return parsedAmount * multiplier;
    case 'per_booking':
      return parsedAmount;
    case 'per_room':
      return parsedAmount * multiplier;
    case 'per_night':
      return parsedAmount * multiplier;
    case 'per_person':
      return parsedAmount;
    case 'per_room_per_night':
      return parsedAmount * multiplier;
    case 'per_person_per_night':
      return parsedAmount;
    default:
      return 0;
  }
};

export default function TaxesBreakdown({ selectedRatesByRoom, currency }) {
  const [combinedTaxes, setCombinedTaxes] = useState({});

  useEffect(function combineTaxes() {
    const newCombinedTaxes = Object.values(selectedRatesByRoom)
      .reduce((acc, selectedRoom) => [...acc, ...selectedRoom.selectedRates], [])
      .reduce((acc, selectedRate) => {
        const { amount = 0, taxes = [] } = selectedRate;
        const updatedTaxes = taxes.map((tax) => ({
          ...tax,
          multiplier: amount,
        }));

        return [...acc, ...updatedTaxes];
      }, [])
      .reduce((acc, tax) => {
        const { title, rate } = tax;
        const taxKey = `${title}_${rate}`;
        const totalAmount = calculateTaxValue(tax);

        const combinedTax = acc[taxKey];

        if (!combinedTax) {
          return { ...acc, [taxKey]: { ...tax, amount: totalAmount } };
        }

        const combinedAmount = combinedTax.amount + totalAmount;
        const newCombinedTax = { ...combinedTax, amount: combinedAmount };

        return { ...acc, [taxKey]: newCombinedTax };
      }, {});

    setCombinedTaxes(newCombinedTaxes);
  }, [selectedRatesByRoom]);

  return (
    <>
      {Object.keys(combinedTaxes).map((taxKey) => (
        <Tax key={taxKey} tax={combinedTaxes[taxKey]} currency={currency} />
      ))}
    </>
  );
}
