import React from 'react';
import { CheckOutlined } from '@ant-design/icons';

import Policy from 'components/policy';

export default function PaymentPolicy({ paymentPolicy }){
  return (
    <Policy
      icon={<CheckOutlined />}
      title="NO PREPAYMENT NEEDED - pay at the property"
      isHighlighted
    />
  );
}