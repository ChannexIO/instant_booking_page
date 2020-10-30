import React, { useCallback, useContext, useRef, useState } from 'react';
import { DateRangePicker } from 'react-dates';
import { useMedia } from 'react-media';

import Label from 'components/label';

import { BookingDataContext } from 'containers/data_context';

import { DATE_FORMAT, DATE_UI_FORMAT } from 'constants/formats';
import MEDIA_QUERIES from 'constants/media_queries';

import 'react-dates/lib/css/_datepicker.css';
import styles from './rangepicker.module.css';

import 'react-dates/initialize';

const OPEN_DIRECTIONS = {
  up: 'up',
  down: 'down',
};

export default function RangePicker(props) {
  const { closedDates } = useContext(BookingDataContext);
  const {
    checkinDate,
    checkoutDate,
    name = '',
    checkinDatePlaceholder,
    checkinDateLabel,
    checkoutDatePlaceholder,
    checkoutDateLabel,
    onDatesChange,
  } = props;
  const [focusedInput, setFocusedInput] = useState(null);
  const [openDirection, setOpenDirection] = useState(OPEN_DIRECTIONS.up);
  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const inputRef = useRef(null);

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
  }, [closedDates, focusedInput, getIsClosedToArrival, getIsClosedToDeparture]);

  const handleFocusChange = useCallback((newFocusedInput) => {
    const inputCoords = inputRef.current.getBoundingClientRect();
    const isPickerCloserToTop = inputCoords.y < (window.innerHeight / 2);

    const newOpenDirection = isPickerCloserToTop ? OPEN_DIRECTIONS.down : OPEN_DIRECTIONS.up;

    setOpenDirection(newOpenDirection);
    setFocusedInput(newFocusedInput);
  }, [inputRef, setOpenDirection, setFocusedInput]);

  return (
    <div className={styles.rangepicker} ref={inputRef}>
      <div className={styles.labelContainer}>
        <Label>{checkinDateLabel}</Label>
        <Label>{checkoutDateLabel}</Label>
      </div>
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
        onFocusChange={handleFocusChange}
      />
    </div>
  );
}
