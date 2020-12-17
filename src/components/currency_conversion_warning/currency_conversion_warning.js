import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Alert from 'components/alert';

import { BookingDataContext } from 'containers/data_context';

export default function CurrencyConversionWarning() {
  const { property, params } = useContext(BookingDataContext);
  const { t } = useTranslation();
  const { data: propertyData } = property;
  const originalCurrency = propertyData?.hotelPolicy?.currency;

  const isCurrencyMatch = params.currency === originalCurrency;

  if (isCurrencyMatch) {
    return null;
  }

  return (
    <Alert text={t('payment_page:currency_convertion_alert', { currency: originalCurrency })} variant="error"/>
  );
}
