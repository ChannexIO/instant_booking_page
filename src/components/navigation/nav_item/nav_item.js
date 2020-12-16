import React from 'react';
import { Nav } from 'react-bootstrap';

import styles from './nav_item.module.css';

export default function NavItem({ children, eventKey, disabled }) {
  return (
    <Nav.Item className={styles.navItem}>
      <Nav.Link
        className={styles.link}
        eventKey={eventKey}
        disabled={disabled}
      >
        {children}
      </Nav.Link>
    </Nav.Item>
  );
}
