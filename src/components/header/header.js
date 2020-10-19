import React from 'react';
import { Col, Row } from 'react-bootstrap';

import HotelTitle from 'components/hotel_title';
import CurrencySelect from 'components/inputs/currency_select';
import LocaleSelect from 'components/inputs/locale_select';

import styles from './header.module.css';

export default function Header({ property }) {
  return (
    <Row className={styles.header}>
      <Col className={styles.titleSection} xs={12} md={9}>
        <div className={styles.hotelInfo}>
          <HotelTitle property={property} />
        </div>
      </Col>
      <Col md={3}>
        <div className={styles.selectSection}>
          <LocaleSelect />
          <CurrencySelect />
        </div>
      </Col>
    </Row>
  );
}
