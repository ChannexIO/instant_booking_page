import React from 'react';
import { Row } from 'react-bootstrap';

import styles from './section_wrapper.module.css';

const CONTAINER_STYLES = {
  light: styles.containerLight,
  dark: styles.containerDark,
};

export default function SectionWrapper({ theme, children, id }) {
  return (
    <div
      id={id}
      className={CONTAINER_STYLES[theme]}
    >
      <div className={styles.containerInner}>
        <Row noGutters>
          {children}
        </Row>
      </div>
    </div>
  );
}
