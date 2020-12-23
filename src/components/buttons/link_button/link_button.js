import React from 'react';
import { Button } from 'react-bootstrap';

import styles from './link_button.module.css';

export default function LinkButton({ children, disabled, className, onClick }) {
  const buttonStyles = [styles.button];

  if (className) {
    buttonStyles.push(className);
  }

  return (
    <Button
      className={buttonStyles.join(' ')}
      variant="link"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
