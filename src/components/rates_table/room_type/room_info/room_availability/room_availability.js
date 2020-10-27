import React from 'react';
import { useTranslation } from 'react-i18next';

import Alert from 'components/alert';

const MAX_AVAILABILITY_TO_SHOW = 3;

export default function RoomAvailability({ availability }) {
  const { t } = useTranslation();

  if (!availability || availability > MAX_AVAILABILITY_TO_SHOW) {
    return null;
  }

  const availabilityAlertText = t('rates_table:room_availability').replace('{n}', availability);

  return (
    <Alert text={availabilityAlertText} variant="error" />
  );
}
