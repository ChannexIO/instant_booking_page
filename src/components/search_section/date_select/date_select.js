import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import RangePicker from 'components/rangepicker';

import setUrlParams from 'utils/set_url_params';
import dateFormatter from 'utils/date_formatter';

export default function DateSelect({ searchParams, handleSearchChange }) {
  const { t } = useTranslation();
  const history = useHistory();

  const handleDatesChange = useCallback(({ startDate, endDate }) => {
    const formattedDates = {
      checkinDate:  dateFormatter.toClient(startDate),
      checkoutDate: dateFormatter.toClient(endDate),
    };

    setUrlParams(formattedDates, history);
    handleSearchChange({ ...searchParams, checkinDate: startDate, checkoutDate: endDate });
  }, [history, searchParams, handleSearchChange]);

  return (
    <RangePicker
      checkinDatePlaceholder={t('hotel_page:checkin_placeholder')}
      checkoutDatePlaceholder={t('hotel_page:checkout_placeholder')}
      checkinDate={searchParams.checkinDate}
      checkoutDate={searchParams.checkoutDate}
      name="search_dates"
      openDirection="up"
      onDatesChange={handleDatesChange}
    />
  );
}