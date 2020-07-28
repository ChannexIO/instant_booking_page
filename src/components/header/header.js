import React from 'react';
import { Row, Col } from "react-bootstrap";

import LocaleSelect from "components/locale_select";

import HotelTitle from "./hotel_title";
import HotelLogo from "./hotel_logo";
import HotelLocation from "./hotel_location";

import styles from "./header.module.css";

export default function Header({ property }) {
  return (
    <Row className={styles.header}>
      <Col className={styles.titleSection} xs={12} md={10}>
        <HotelLogo property={property} />
        <div>
          <HotelTitle property={property} />
          <HotelLocation property={property} />
        </div>
      </Col>
      <Col  className={styles.localeSelectSection} md={2}>
        <LocaleSelect />
      </Col>
    </Row>
  );
}