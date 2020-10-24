import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import styles from './section_wrapper.module.css';

const CONTAINER_STYLES = {
  light: styles.containerLight,
  dark: styles.containerDark,
};

export default function SectionWrapper({ theme, children }) {
  return (
    <div className={CONTAINER_STYLES[theme]}>
      <div className={styles.containerInner}>
        <Row noGutters>
          <Col xs="12" md="8" >
            {children}
          </Col>
          <Col xs="0" md="4" />
        </Row>
      </div>
    </div>
  );
}
