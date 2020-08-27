import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckOutlined } from '@ant-design/icons';

import Policy from 'components/policy';

export default function CancellationPolicy({ cancellationPolicy }) {
  const { t } = useTranslation();


  // TODO - update implementation as format will be set
  return (
    <Policy
      icon={<CheckOutlined />}
      title="FREE cancellation before 23:59 on 13 September 2020"
      isHighlighted
    />
  );
}