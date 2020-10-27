import React, { useRef, useState } from 'react';
import { Overlay } from 'react-bootstrap';

import styles from './tooltip.module.css';

export default function PoliciesInfo({ className, children }) {
  const [isShown, setIsShown] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef();

  const handleShow = (event) => {
    setIsShown(!isShown);
    setTarget(event.target);
  };

  const handleHide = () => {
    setIsShown(false);
  };

  return (
    <div className={[styles.tooltipContainer, className].join(' ')} ref={ref}>
      <div
        role="button"
        tabIndex="0"
        className={styles.tooltipIcon}
        onMouseEnter={handleShow}
        onMouseLeave={handleHide}
        onKeyDown={handleShow}
        onClick={handleShow}
      />
      <Overlay
        rootClose
        show={isShown}
        target={target}
        rootCloseEvent="click"
        placement="top"
        container={ref.current}
        onHide={handleHide}
      >
        {children}
      </Overlay>
    </div>
  );
}
