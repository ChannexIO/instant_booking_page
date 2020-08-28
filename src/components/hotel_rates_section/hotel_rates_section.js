import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import SectionTitle from 'components/section_title';
import RatesTable from 'components/rates_table';

import styles from './hotel_rates_section.module.css';

export default function HotelRatesSection({ property, propertyRooms, loading, searchParams }) {
  const { currency, startDate, endDate } = searchParams;
  const { t } = useTranslation();
  const isEnteredDatesValid = startDate && endDate && moment(startDate).isValid() && moment(endDate).isValid();
  const residenceTime = isEnteredDatesValid ? endDate.diff(startDate, 'days') : null;

  return (
    <div id="hotel_rates_section">
      <SectionTitle>{t('rates_table:title')}</SectionTitle>
      <RatesTable
        residenceTime={residenceTime}
        property={property}
        propertyRooms={propertyRooms}
        currency={currency}
      />
    </div>
  );
}