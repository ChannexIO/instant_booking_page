import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PriceColumnTitle({ residenceTime }) {
  const { t } = useTranslation();

  const priceColumnTitle = residenceTime > 1
  ? t('rates_table:price_multiple_nights').replace('{n}', residenceTime)
  : t('rates_table:price');

  return (
    <>
      {priceColumnTitle}
    </>
  );
}