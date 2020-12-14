import React from 'react';
import { Button } from 'react-bootstrap';

import styles from './link_button.module.css';

export default function LinkButton({ children, onClick }) {
  return (
    <Button
      className={styles.button}
      variant="link"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
