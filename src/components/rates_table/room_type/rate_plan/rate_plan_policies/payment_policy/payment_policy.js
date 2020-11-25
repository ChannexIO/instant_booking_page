import React from 'react';
import { useTranslation } from 'react-i18next';

import Alert from 'components/alert';

export default function PaymentPolicy({ cancellationPolicy }) {
  const { t } = useTranslation();

  if (!cancellationPolicy) {
    return null;
  }

  const { guaranteePaymentPolicy, currency, guaranteePaymentAmount } = cancellationPolicy;

  const currencyUnit = guaranteePaymentPolicy === 'percent_based' ? '%' : currency;
  const policyTextParams = { amount: guaranteePaymentAmount, currency: currencyUnit };
  const policyText = t(`payment_policies:types:${guaranteePaymentPolicy}`, policyTextParams);

  return (
    <Alert
      text={policyText}
      variant="success"
    />
  );
}
