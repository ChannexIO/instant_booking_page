import React from 'react';

import Alert from 'components/alert';

export default function PaymentPolicy({ paymentPolicy }) {
  return (
    <Alert
      text="NO PREPAYMENT NEEDED - pay at the property"
      variant="success"
    />
  );
}
