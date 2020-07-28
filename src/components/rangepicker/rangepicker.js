import React, { useState } from 'react';
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import 'react-dates/lib/css/_datepicker.css';
import { useMedia } from 'react-media';

import MEDIA_QUERIES from "constants/media_queries";

import styles from "./rangepicker.module.css";

export default function RangePicker(props) {
  const { startDate, endDate, name = "", openDirection = "down", startDatePlaceholder, endDatePlaceholder,  onDatesChange } = props;
  const [focusedInput, setFocusedInput] = useState(null);
  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const isMobile = matchedQueries.xs;
  const numberOfMonths = matchedQueries.xs || matchedQueries.sm ? 1 : 2;

  return (
    <div className={styles.rangepicker}>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        startDatePlaceholderText={startDatePlaceholder}
        endDatePlaceholderText={endDatePlaceholder}
        startDateId={`${name}_start_date`}
        endDateId={`${name}_end_date`}
        openDirection={openDirection}
        numberOfMonths={numberOfMonths}
        withFullScreenPortal={isMobile}
        onDatesChange={onDatesChange}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
      />
    </div>
  );
}