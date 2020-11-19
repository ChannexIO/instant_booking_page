import React from 'react';
import { Button } from 'react-bootstrap';

import IconNavigationDown from 'static/icons-navigation-down.svg';

import styles from './expand_button.module.css';

export default function ExpandButton({ title, expanded, onClick }) {
  const arrowStyles = [styles.arrowIcon];

  if (expanded) {
    arrowStyles.push(styles.arrowIconInverted);
  }

  return (
    <Button variant="link" className={styles.expandButton} onClick={onClick}>
      <strong>{title}</strong>
      <img
        src={IconNavigationDown}
        className={arrowStyles.join(' ')}
        alt={title}
      />
    </Button>
  );
}
