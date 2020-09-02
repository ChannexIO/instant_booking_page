import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import RangePicker from 'components/rangepicker';

import setUrlParams from 'utils/set_url_params';
import { DATE_FORMAT } from 'constants/formats';

export default function DateSelect({ searchParams, handleSearchChange }) {
  const { t } = useTranslation();
  const history = useHistory();

  const setDatesToUrl = (startDate, endDate) => {
    const formattedDates = {
      startDate:  startDate ? moment(startDate).format(DATE_FORMAT)  : null,
      endDate: endDate ? moment(endDate).format(DATE_FORMAT) : null,
    };

    setUrlParams(formattedDates, history);
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    setDatesToUrl(startDate, endDate);
    
    handleSearchChange({ ...searchParams, startDate, endDate });
  };

  return (
    <RangePicker
      startDatePlaceholder={t('hotel_page:checkin_placeholder')}
      endDatePlaceholder={t('hotel_page:checkout_placeholder')}
      startDate={searchParams.startDate}
      endDate={searchParams.endDate}
      name="search_dates"
      openDirection="up"
      onDatesChange={handleDatesChange}
    />
  );
}