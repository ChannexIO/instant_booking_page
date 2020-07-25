import React, { useState, useRef, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

import Datepicker from "components/datepicker";
import SearchButton from "./search_button";

import getUrlParams from "utils/get_url_params";

import styles from "./search_section.module.css";

export default function SearchSection({ property }) {
  const { t } = useTranslation();
  const checkoutPickerRef = useRef(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    const urlParams = getUrlParams();
    const { startDate, endDate } = urlParams;
    const parsedStartDate = Date.parse(startDate);
    const parsedEndDate = Date.parse(endDate);

    if (!isNaN(parsedStartDate)) {
      setStartDate(parsedStartDate);
    }

    if (!isNaN(parsedEndDate)) {
      setEndDate(parsedEndDate);
    }
  }, []);

  const handleCheckinChange = (startDate) => {
    setStartDate(startDate);

    if (checkoutPickerRef && checkoutPickerRef.current) {
      checkoutPickerRef.current.setOpen(true);
    }
  };

  return (
    <Row className={styles.searchSection}>
      <Col className={styles.colLeft} lg={3} md={4} xs={6}>
        <Datepicker
          label={t("hotel_page:checkin_label")}
          placeholderText={t("hotel_page:checkin_placeholder")}
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          selectStart
          onChange={handleCheckinChange}
        />
      </Col>
      <Col className={styles.colRight} lg={3} md={4} xs={6}>
        <Datepicker
          ref={checkoutPickerRef}
          label={t("hotel_page:checkout_label")}
          placeholderText={t("hotel_page:checkout_placeholder")}
          selected={endDate}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          selectEnd
          onChange={setEndDate}
        />
      </Col>
      <Col className={styles.buttonContainer} lg={2} md={2} xs={12}>
        <SearchButton />
      </Col>
      
    </Row>
  );
}