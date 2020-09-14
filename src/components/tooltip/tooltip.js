import React, { useRef, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
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

  const iconClass = isShown ? styles.tooltipIconActive : styles.tooltipIcon;

  return (
    <div className={[styles.tooltipContainer, className].join(' ')} ref={ref}>
      <InfoCircleOutlined
        className={iconClass}
        onMouseEnter={handleShow}
        onMouseLeave={handleHide}
        onClick={handleShow}
      />

      <Overlay
        rootClose
        show={isShown}
        target={target}
        rootCloseEvent="click"
        placement="bottom"
        container={ref.current}
        onHide={handleHide}
      >
        {children}
      </Overlay>
    </div>
  );
}