import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Alert from 'components/alert';

export default function MissingSpaces({ selectedRatesByRoom, bookingParams }) {
  const [missingAdultsSpaces, setMissingAdultsSpaces] = useState(0);
  const [missingChildSpaces, setMissingChildSpaces] = useState(0);
  const { t } = useTranslation();
  const { adults, children } = bookingParams;

  useEffect(function calculateMissingSpaces() {
    let availableAdultSpaces = 0;
    let availableChildSpaces = 0;

    Object.values(selectedRatesByRoom).forEach((room) => {
      room.selectedRates.forEach((rate) => {
        const { amount, occupancy } = rate;

        availableAdultSpaces += amount * occupancy.adults;
        availableChildSpaces += amount * occupancy.children;
      });
    });

    const missingAdults = adults - availableAdultSpaces;
    const missingChild = children - availableChildSpaces;

    if (missingAdults > 0) {
      setMissingAdultsSpaces(missingAdults);
    }

    if (missingChild > 0) {
      setMissingChildSpaces(missingChild);
    }
  }, [selectedRatesByRoom, adults, children]);

  if (!missingChildSpaces && !missingAdultsSpaces) {
    return null;
  }

  return (
    <Alert text={t('hotel_page:missing_spaces')} variant="error"/>
  );
}
