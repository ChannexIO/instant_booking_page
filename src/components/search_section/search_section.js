import React, { useState, useRef, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import moment from "moment";

import RangePicker from "components/rangepicker";
import SearchButton from "./search_button";

import getUrlParams from "utils/get_url_params";

import styles from "./search_section.module.css";

export default function SearchSection({ property }) {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const urlParams = getUrlParams();
    const { startDate, endDate } = urlParams;
    const parsedStartDate = moment(startDate);
    const parsedEndDate = moment(endDate);

    if (startDate && parsedStartDate.isValid()) {
      setStartDate(parsedStartDate);
    }

    if (endDate && parsedEndDate.isValid()) {
      setEndDate(parsedEndDate);
    }
  }, []);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <Row className={styles.searchSection}>
      <div>
        <RangePicker
          startDatePlaceholder={t("hotel_page:checkin_placeholder")}
          endDatePlaceholder={t("hotel_page:checkout_placeholder")}
          startDate={startDate}
          endDate={endDate}
          name="search_dates"
          openDirection="up"
          onDatesChange={handleDatesChange}
        />
      </div>
      <div className={styles.buttonSection}>
        <SearchButton />
      </div>
    </Row>
  );
}