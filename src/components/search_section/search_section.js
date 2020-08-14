import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import moment from "moment";

import RangePicker from "components/rangepicker";

import getUrlParams from "utils/get_url_params";
import setUrlParams from "utils/set_url_params";
import { DATE_FORMAT } from "constants/formats";

import SearchButton from "./search_button";

import styles from "./search_section.module.css";

export default function SearchSection({ property }) {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const history = useHistory();

  const setDatesFromUrl = () => {
    const urlParams = getUrlParams();
    const { startDate, endDate } = urlParams;

    const parsedStartDate = moment(startDate, DATE_FORMAT);
    const parsedEndDate = moment(endDate, DATE_FORMAT);

    if (startDate && parsedStartDate.isValid()) {
      setStartDate(parsedStartDate);
    }

    if (endDate && parsedEndDate.isValid()) {
      setEndDate(parsedEndDate);
    }
  };

  const setDatesToUrl = (startDate, endDate) => {
    const formattedDates = {
      startDate: moment(startDate).format(DATE_FORMAT),
      endDate: moment(endDate).format(DATE_FORMAT),
    };

    setUrlParams(formattedDates, history);
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    setDatesToUrl(startDate, endDate);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(function setInitialDates() {
    setDatesFromUrl();
  }, []);

  useEffect(function setHistoryListener() {
    return history.listen(() => {
      setDatesFromUrl();
    })
  }, [history]);

  return (
    <Row className={styles.searchSection}>
      <RangePicker
        startDatePlaceholder={t("hotel_page:checkin_placeholder")}
        endDatePlaceholder={t("hotel_page:checkout_placeholder")}
        startDate={startDate}
        endDate={endDate}
        name="search_dates"
        openDirection="up"
        onDatesChange={handleDatesChange}
      />
      <div className={styles.buttonSection}>
        <SearchButton />
      </div>
    </Row>
  );
}