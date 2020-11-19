import React from 'react';
import { Col, Row } from 'react-bootstrap';

import styles from './section_wrapper.module.css';

const CONTAINER_STYLES = {
  light: styles.containerLight,
  dark: styles.containerDark,
};

export default function SectionWrapper({ theme, children, additionalInfo, id }) {
  return (
    <div
      id={id}
      className={CONTAINER_STYLES[theme]}
    >
      <div className={styles.containerInner}>
        <Row noGutters>
          <Col xs="12" lg="8" >
            {children}
          </Col>
          <Col xs="12" lg="4" >
            {additionalInfo}
          </Col>
        </Row>
      </div>
    </div>
  );
}
