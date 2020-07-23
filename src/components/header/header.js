import React from 'react';
import { Row, Col } from "react-bootstrap";

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
      <Col xs={12} md={2}>
        locale select
      </Col>
    </Row>
  );
}