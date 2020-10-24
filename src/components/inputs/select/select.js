import React, { useCallback } from 'react';
import { Dropdown } from 'react-bootstrap';

import styles from './select.module.css';

export default function Select({ label, value, children, options, onChange }) {
  const renderOptions = useCallback(() => {
    return options.map((option) => (
      <Dropdown.Item
        className={styles.menuItem}
        key={option.key}
        eventKey={option.key}
        active={option.key === value}
      >
        {option.value}
      </Dropdown.Item>
    ));
  }, [value, options]);

  return (
    <Dropdown onSelect={onChange}>
      <Dropdown.Toggle className={styles.toggle} variant="link">
        {label}
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles.menu}>
        {renderOptions()}
      </Dropdown.Menu>
    </Dropdown>
  );
}
