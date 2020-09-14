import React from 'react';
import { Row, Col } from 'react-bootstrap';

import LocaleSelect from 'components/inputs/locale_select';
import CurrencySelect from 'components/inputs/currency_select';
import HotelTitle from 'components/hotel_title';

import styles from './header.module.css';

export default function Header({ property, searchParams, handleSearchChange }) {
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
          <CurrencySelect searchParams={searchParams} handleSearchChange={handleSearchChange} />
        </div>
      </Col>
    </Row>
  );
}