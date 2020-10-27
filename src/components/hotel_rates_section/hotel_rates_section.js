import React from 'react';
import { useTranslation } from 'react-i18next';

import RatesTable from 'components/rates_table';
import SectionTitle from 'components/section_title';

export default function HotelRatesSection() {
  const { t } = useTranslation();

  return (
    <div id="hotel_rates_section">
      <SectionTitle>{t('rates_table:title')}</SectionTitle>
      <RatesTable />
    </div>
  );
}
