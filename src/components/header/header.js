import React from 'react';
import { Row, Col } from "react-bootstrap";
import { useMedia } from 'react-media';

import LocaleSelect from "components/inputs/locale_select";
import CurrencySelect from "components/inputs/currency_select";

import MEDIA_QUERIES from "constants/media_queries";

import HotelTitle from "./hotel_title";
import HotelLogo from "./hotel_logo";
import HotelLocation from "./hotel_location";

import styles from "./header.module.css";

export default function Header({ property, searchParams, handleSearchChange }) {
  const matchedQueries = useMedia({ queries: MEDIA_QUERIES });
  const isMobile = matchedQueries.xs || matchedQueries.sm;

  const selectors = (
    <div className={styles.selectSection}>
      <LocaleSelect />
      <CurrencySelect searchParams={searchParams} handleSearchChange={handleSearchChange} />
    </div>
  );

  return (
    <Row className={styles.header}>
      <Col className={styles.titleSection} xs={12} md={9}>
        <HotelLogo property={property} />
        <div className={styles.hotelInfo}>
          <HotelTitle property={property} />
          {isMobile 
            ? selectors
            : <HotelLocation property={property} />
          }
        </div>
      </Col>
      <Col md={3}>
        {isMobile ? null : selectors}
      </Col>
    </Row>
  );
}