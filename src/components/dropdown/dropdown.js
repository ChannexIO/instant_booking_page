import React, { useCallback, useState } from 'react';
import { Dropdown as BootstrapDropdown } from 'react-bootstrap';

import Label from 'components/inputs/components/label';

import styles from './dropdown.module.css';

const VERTICAL_ORIENTATION = 'vertical';

export default function Dropdown({ className, layout, children, title, label }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerClass = layout === VERTICAL_ORIENTATION
    ? styles.containerVertical
    : styles.containerHorizontal;

  const handleVisibilityToggle = useCallback((newVisibilityState, event, meta) => {
    if (meta.source === 'select') {
      return;
    }

    setIsVisible(newVisibilityState);
  }, []);

  return (
    <div className={[containerClass, className].join(' ')}>
    {label && (
      <Label>{label}</Label>
    )}
    <BootstrapDropdown
      className={styles.dropdown}
      show={isVisible}
      onToggle={handleVisibilityToggle}
    >
      <BootstrapDropdown.Toggle className={styles.dropdownToggle}>
        {title}
      </BootstrapDropdown.Toggle>
      <BootstrapDropdown.Menu className={styles.dropdownMenu} >
        {children}
      </BootstrapDropdown.Menu>
    </BootstrapDropdown>
  </div>
  );
}
