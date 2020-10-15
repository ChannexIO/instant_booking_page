import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import SectionTitle from 'components/section_title';
import RatesTable from 'components/rates_table';

import { DataContext } from 'containers/data_context';

export default function HotelRatesSection({ property, propertyRooms, loading }) {
  const { searchParams } = useContext(DataContext);
  const { currency, checkinDate, checkoutDate, adults, children } = searchParams;
  const { t } = useTranslation();
  const isEnteredDatesValid = checkinDate && checkoutDate && moment(checkinDate).isValid() && moment(checkoutDate).isValid();
  const residenceTime = isEnteredDatesValid ? checkoutDate.diff(checkinDate, 'days') : null;

  return (
    <div id="hotel_rates_section">
      <SectionTitle>{t('rates_table:title')}</SectionTitle>
      <RatesTable
        residenceTime={residenceTime}
        property={property}
        propertyRooms={propertyRooms}
        currency={currency}
        adults={adults}
        children={children}
      />
    </div>
  );
}