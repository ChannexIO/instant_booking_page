import React from 'react';
import { useTranslation } from 'react-i18next';

import Caption from 'components/caption';
import Currency from 'components/currency';

export default function RatePriceBreakdown({ ratePlan, currency }) {
  const { t } = useTranslation();
  const { netPrice, lengthOfStay, amount } = ratePlan;
  const pricePerNight = netPrice / lengthOfStay;

  return (
    <Caption>
      <Currency amount={pricePerNight} currency={currency} />
      {` × ${amount} ${t('hotel_page:rooms')} × ${lengthOfStay} ${t('hotel_page:nights')}`}
    </Caption>
  );
}
