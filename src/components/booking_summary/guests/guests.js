import React from 'react';
import { useTranslation } from 'react-i18next';

import Label from 'components/label';
import Cell from 'components/layout/cell';

export default function Guests({ adultGuests = 0, childrenGuests = 0 }) {
  const { t } = useTranslation();
  const adults = `${adultGuests} ${t('payment_page:booking_summary:adults')}`;
  const children = `${childrenGuests} ${t('payment_page:booking_summary:children')}`;

  const text = `${adults} · ${children}`;

  return (
    <Cell>
      <Label>{t('payment_page:booking_summary:guests_label')}</Label>
      <strong>
        {text}
      </strong>
    </Cell>
  );
}
