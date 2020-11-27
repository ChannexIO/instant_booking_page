import React from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import SectionWrapper from 'components/layout/section_wrapper';
import RatesTable from 'components/rates_table';
import SectionTitle from 'components/section_title';

export default function HotelRatesSection() {
  const { t } = useTranslation();

  return (
    <SectionWrapper theme="dark">
      <Col xs="12" lg="8" >
        <SectionTitle>{t('rates_table:title')}</SectionTitle>
        <RatesTable />
      </Col>
    </SectionWrapper>
  );
}
