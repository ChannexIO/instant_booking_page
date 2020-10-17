import React, { useCallback, useContext, useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { useMedia } from 'react-media';

import { DataContext } from 'containers/data_context';

import MEDIA_QUERIES from 'constants/media_queries';
import { DATE_UI_FORMAT, DATE_FORMAT } from 'constants/formats';

import styles from './rangepicker.module.css';

const DEFAULT_OPEN_DIRECTION = 'down';

export default function RangePicker(props) {
  const { closedDates } = useContext(DataContext);
  const { checkinDate, checkoutDate, name = '', openDirection = DEFAULT_OPEN_DIRECTION, checkinDatePlaceholder, checkoutDatePlaceholder,  onDatesChange } = props;
  const [focusedInput, setFocusedInput] = useState(null);
  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });

  const isMobile = matchedQueries.xs;
  const numberOfMonths = matchedQueries.xs || matchedQueries.sm ? 1 : 2;

  const getIsClosedToArrival = useCallback((formattedDay) => {
    return closedDates.data.closedToArrival.includes(formattedDay);
  }, [closedDates]);

  const getIsClosedToDeparture = useCallback((day, formattedDay) => {
    const { closedToDeparture, closedToArrival } = closedDates.data;

    const isClosedToDeparture = closedToDeparture.includes(formattedDay);

    const isDateBeforeArrival = day.isSameOrBefore(checkinDate);
    const isClosedToArrival = closedToArrival.includes(formattedDay);

    return isClosedToDeparture || (isDateBeforeArrival && isClosedToArrival);
  }, [closedDates, checkinDate]);

  const getIsDayBlocked = useCallback((day) => {
    if (!closedDates.data) {
      return false;
    }

    const { closed } = closedDates.data;
    const formattedDay = day.format(DATE_FORMAT);

    if (closed.includes(formattedDay)) {
      return true;
    }

    if (focusedInput === 'startDate') {
      return getIsClosedToArrival(formattedDay);
    }

    if (focusedInput === 'endDate') {
       return getIsClosedToDeparture(day, formattedDay);
    }

    return false;
  }, [closedDates.data, focusedInput, getIsClosedToArrival, getIsClosedToDeparture]);

  return (
    <div className={styles.rangepicker}>
      <DateRangePicker
        displayFormat={DATE_UI_FORMAT}
        startDate={checkinDate}
        endDate={checkoutDate}
        startDatePlaceholderText={checkinDatePlaceholder}
        endDatePlaceholderText={checkoutDatePlaceholder}
        startDateId={`${name}_start_date`}
        endDateId={`${name}_end_date`}
        openDirection={openDirection}
        numberOfMonths={numberOfMonths}
        withFullScreenPortal={isMobile}
        onDatesChange={onDatesChange}
        focusedInput={focusedInput}
        isDayBlocked={getIsDayBlocked}
        onFocusChange={setFocusedInput}
      />
    </div>
  );
}