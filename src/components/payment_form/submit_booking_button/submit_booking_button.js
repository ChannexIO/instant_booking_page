import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/button';

import { PaymentFormActionsContext, PaymentFormDataContext } from 'containers/data_context';

export default function SubmitBookingButton() {
  const { startSubmit } = useContext(PaymentFormActionsContext);
  const { isSubmitting } = useContext(PaymentFormDataContext);
  const { t } = useTranslation();

  return (
    <Button
      loading={isSubmitting}
      disabled={isSubmitting}
      onClick={startSubmit}
    >
      {t('payment_page:agree_and_book')}
    </Button>
  );
}
