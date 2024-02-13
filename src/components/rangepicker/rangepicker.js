import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-dates";
import { useTranslation } from "react-i18next";
import { useMedia } from "react-media";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import classNames from "classnames";
import moment from "moment";

import Label from "components/label";

import { BookingDataContext } from "containers/data_context";

import { DATE_API_FORMAT, DATE_UI_FORMAT } from "constants/formats";
import MEDIA_QUERIES from "constants/media_queries";
import getOpenDirection from "utils/get_open_direction";

import DayCell from "./day_cell";
import enrichClosedDates from "./enrich_closed_dates";
import InfoSection from "./info_section";

import "react-dates/lib/css/_datepicker.css";
import styles from "./rangepicker.module.css";

import "react-dates/initialize";

const OPEN_DIRECTIONS = ["up", "down"];

const MIN_STAY_LENGTH = 1;
const START_DATE_INPUT = "startDate";
const END_DATE_INPUT = "endDate";

const getMinStayLength = (closedDates, checkinDate) => {
  if (!checkinDate || !closedDates.data) {
    return MIN_STAY_LENGTH;
  }
  const { minStayArrival, minStayThrough } = closedDates.data;
  const { [checkinDate]: minStayArrivalValue = MIN_STAY_LENGTH } = minStayArrival;
  const { [checkinDate]: minStayThroughValue = MIN_STAY_LENGTH } = minStayThrough;
  const minStayLength = Math.max(minStayArrivalValue, minStayThroughValue);

  return minStayLength;
};

export default function RangePicker(props) {
  const { t } = useTranslation();
  const { closedDates } = useContext(BookingDataContext);
  const {
    checkinDate,
    checkoutDate,
    name = "",
    isVisible = false,
    checkinDatePlaceholder,
    checkinDateLabel,
    checkoutDatePlaceholder,
    checkoutDateLabel,
    onDatesChange,
    className,
    closeCallback,
  } = props;
  const [focusedInput, setFocusedInput] = useState(null);
  const [openDirection, setOpenDirection] = useState(OPEN_DIRECTIONS.up);
  const [hashedClosedDates, setHashedClosedDates] = useState(null);
  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const inputRef = useRef(null);
  const formattedCheckinDate = checkinDate && checkinDate.format(DATE_API_FORMAT);
  const minStayLength = getMinStayLength(closedDates, formattedCheckinDate);

  const isMobile = matchedQueries.xs;
  const numberOfMonths = matchedQueries.xs || matchedQueries.sm ? 1 : 2;

  if (checkinDate) {
    checkinDate.locale(t("general:code"));
  }

  if (checkoutDate) {
    checkoutDate.locale(t("general:code"));
  }

  moment.locale(t("general:code"));

  const getIsClosedToArrival = useCallback(
    (_day, formattedDay) => {
      if (!hashedClosedDates) {
        return false;
      }
      const { closedToArrivalHash } = hashedClosedDates;

      return closedToArrivalHash[formattedDay];
    },
    [hashedClosedDates],
  );

  const getIsClosed = useCallback(
    (_day, formattedDay) => {
      if (!hashedClosedDates) {
        return false;
      }
      const { closedHash } = hashedClosedDates;

      return closedHash[formattedDay];
    },
    [hashedClosedDates],
  );

  const getIsClosedToDeparture = useCallback(
    (day, formattedDay) => {
      const { closedToDepartureHash, closed } = hashedClosedDates;

      const isDateBeforeArrival = formattedDay <= formattedCheckinDate;
      const isClosedToDeparture = closedToDepartureHash[formattedDay];

      if (isDateBeforeArrival || isClosedToDeparture) {
        return true;
      }

      const closestClosed =
        formattedCheckinDate &&
        closed.find((closedDate) => {
          return formattedCheckinDate < closedDate;
        });

      // Closed date could be selected as departure date, but shouldnt be in range
      const isAfterClosed =
        closestClosed && day.isAfter(moment(closestClosed, DATE_API_FORMAT), "day");

      return isAfterClosed;
    },
    [hashedClosedDates, formattedCheckinDate],
  );

  const getIsDayBlocked = useCallback(
    (day) => {
      if (!hashedClosedDates) {
        return false;
      }

      const formattedDay = day.format(DATE_API_FORMAT);

      if (focusedInput === START_DATE_INPUT) {
        return getIsClosed(day, formattedDay);
      }

      if (focusedInput === END_DATE_INPUT) {
        return getIsClosedToDeparture(day, formattedDay);
      }

      return false;
    },
    [hashedClosedDates, focusedInput, getIsClosed, getIsClosedToDeparture],
  );

  const getIsDayBlockedByMinStay = useCallback(
    (day) => {
      if (!hashedClosedDates || !day) {
        return false;
      }

      const formattedDay = day.format(DATE_API_FORMAT);
      const { closedToArrivalByMinStayHash } = hashedClosedDates;

      return closedToArrivalByMinStayHash[formattedDay];
    },
    [hashedClosedDates],
  );

  const handleFocusChange = useCallback(
    (newFocusedInput) => {
      if (newFocusedInput === START_DATE_INPUT && checkoutDate) {
        onDatesChange({ startDate: checkinDate, endDate: null });
      }

      const newOpenDirection = getOpenDirection(inputRef, OPEN_DIRECTIONS);
      setOpenDirection(newOpenDirection);
      setFocusedInput(newFocusedInput);
    },
    [inputRef, checkinDate, checkoutDate, onDatesChange, setOpenDirection, setFocusedInput],
  );

  const handleDatesReset = useCallback(() => {
    onDatesChange({ startDate: null, endDate: null });
    setFocusedInput(START_DATE_INPUT);
  }, [onDatesChange]);

  const handleClose = useCallback(() => {
    setFocusedInput(null);
  }, []);

  useEffect(
    function handleClosedDateChanged() {
      if (!closedDates.data) {
        setHashedClosedDates(null);
        return;
      }

      const newHashedClosedDates = enrichClosedDates(closedDates.data);
      setHashedClosedDates(newHashedClosedDates);
    },
    [closedDates],
  );

  useEffect(
    function handleInputParamsChanged() {
      const isMinStayRestricted = getIsDayBlockedByMinStay(checkinDate);

      if (focusedInput === END_DATE_INPUT && isMinStayRestricted) {
        setFocusedInput(START_DATE_INPUT);
      }
    },
    [checkinDate, focusedInput, getIsDayBlockedByMinStay, setFocusedInput],
  );

  useEffect(() => {
    if (isVisible) {
      setFocusedInput(START_DATE_INPUT);
    }
  }, [setFocusedInput, isVisible]);

  const renderCalendarDay = useCallback(
    (dayProps) => {
      const { day } = dayProps;
      const formattedDay = day && day.format(DATE_API_FORMAT);
      const isClosedToArrival =
        (focusedInput === START_DATE_INPUT && getIsClosedToArrival(day, formattedDay)) || false;
      const isMinStayRestricted =
        focusedInput === START_DATE_INPUT && getIsDayBlockedByMinStay(day);

      return (
        <DayCell
          {...dayProps}
          isClosedToArrival={isClosedToArrival}
          isMinStayRestricted={isMinStayRestricted}
          minStayLength={minStayLength}
        />
      );
    },
    [focusedInput, minStayLength, getIsDayBlockedByMinStay, getIsClosedToArrival],
  );

  const renderCalendarInfo = useCallback(
    () => <InfoSection onClear={handleDatesReset} onClose={handleClose} />,
    [handleDatesReset, handleClose],
  );

  const wrapperClassName = classNames(styles.rangepicker, {
    [`${className}`]: className,
  });

  return (
    <div className={wrapperClassName} ref={inputRef}>
      <div className={styles.labelContainer}>
        <Label>{checkinDateLabel}</Label>
        <Label>{checkoutDateLabel}</Label>
      </div>
      <DateRangePicker
        displayFormat={DATE_UI_FORMAT}
        startDate={checkinDate}
        endDate={checkoutDate}
        anchorDirection="right"
        startDatePlaceholderText={checkinDatePlaceholder}
        endDatePlaceholderText={checkoutDatePlaceholder}
        startDateId={`${name}_start_date`}
        endDateId={`${name}_end_date`}
        openDirection={openDirection}
        numberOfMonths={numberOfMonths}
        withFullScreenPortal={isMobile}
        focusedInput={focusedInput}
        minimumNights={minStayLength}
        navPrev={<LeftOutlined className={styles.navPrev} />}
        navNext={<RightOutlined className={styles.navNext} />}
        hideKeyboardShortcutsPanel
        renderCalendarDay={renderCalendarDay}
        isDayBlocked={getIsDayBlocked}
        renderCalendarInfo={renderCalendarInfo}
        onFocusChange={handleFocusChange}
        onDatesChange={onDatesChange}
        onClose={closeCallback}
      />
    </div>
  );
}
