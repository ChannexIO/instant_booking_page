import React from 'react';
import { useTranslation } from 'react-i18next';

import Label from 'components/label';
import Cell from 'components/layout/cell';

export default function Guests({ params }) {
  const { t } = useTranslation();

  const adults = `${params.adults} ${t('payment_page:booking_summary:adults')}`;
  const children = `${params.children} ${t('payment_page:booking_summary:children')}`;

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
