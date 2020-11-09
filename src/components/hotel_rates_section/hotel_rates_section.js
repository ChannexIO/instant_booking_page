import React from 'react';
import { useTranslation } from 'react-i18next';

import SectionWrapper from 'components/layout/section_wrapper';
import RatesTable from 'components/rates_table';
import SectionTitle from 'components/section_title';

export default function HotelRatesSection() {
  const { t } = useTranslation();

  return (
    <SectionWrapper theme="dark">
      <SectionTitle>{t('rates_table:title')}</SectionTitle>
      <RatesTable />
    </SectionWrapper>
  );
}
