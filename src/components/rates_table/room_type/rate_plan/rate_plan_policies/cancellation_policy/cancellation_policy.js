import React from 'react';
import { useTranslation } from 'react-i18next';

import Alert from 'components/alert';

export default function CancellationPolicy({ cancellationPolicy }) {
  const { t } = useTranslation();

  // TODO - update implementation as format will be set
  return (
    <Alert
      text="FREE cancellation before 23:59 on 13 September 2020"
      variant="success"
    />
  );
}
