import React from 'react';
import { Container } from 'react-bootstrap';

import styles from './section_wrapper.module.css';

const CONTAINER_STYLES = {
  light: styles.containerLight,
  dark: styles.containerDark,
};

export default function SectionWrapper({ theme, children }) {
  return (
    <div className={CONTAINER_STYLES[theme]}>
      <Container>
        {children}
      </Container>
    </div>
  );
}
