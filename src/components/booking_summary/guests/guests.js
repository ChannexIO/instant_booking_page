import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Label from 'components/label';
import Cell from 'components/layout/cell';

const DEFAULT_OCCUPANCY = {
  adults: 0,
  children: 0,
};

export default function Guests({ selectedRatesByRoom }) {
  const [bookingOccupancy, setBookingOccupancy] = useState(DEFAULT_OCCUPANCY);
  const { t } = useTranslation();

  useEffect(function calcuateOccupancy() {
    let adultGuests = 0;
    let childrenGuests = 0;

    Object.keys(selectedRatesByRoom)
      .forEach((roomId) => {
        const { selectedRates = [] } = selectedRatesByRoom[roomId];

        selectedRates.forEach(({ amount, occupancy }) => {
          adultGuests += occupancy.adults * amount;
          childrenGuests += occupancy.children * amount;
        });
      });

    const newOccupancy = {
      adults: adultGuests,
      children: childrenGuests,
    };

    setBookingOccupancy(newOccupancy);
  }, [selectedRatesByRoom]);

  const adults = `${bookingOccupancy.adults} ${t('payment_page:booking_summary:adults')}`;
  const children = `${bookingOccupancy.children} ${t('payment_page:booking_summary:children')}`;

  const text = `${adults} · ${children}`;

  return (
    <Cell>
      <Label>{t('payment_page:booking_summary:guests_label')}</Label>
      <strong>
        {text}
      </strong>
    </Cell>
  );
}
