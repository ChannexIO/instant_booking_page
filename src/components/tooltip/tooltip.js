import React, { useCallback, useRef, useState } from 'react';
import { Overlay } from 'react-bootstrap';

import styles from './tooltip.module.css';

const OVERLAY_POSITIONS = {
  top: 'top',
  bottom: 'bottom',
};

export default function PoliciesInfo({ className, children }) {
  const [isShown, setIsShown] = useState(false);
  const [target, setTarget] = useState(null);
  const [overlayPlacement, setOverlayPlacement] = useState(OVERLAY_POSITIONS.top);
  const ref = useRef();

  const getOpenDirection = useCallback(() => {
    const inputCoords = ref.current.getBoundingClientRect();
    const isTooltipCloserToTop = inputCoords.y < (window.innerHeight / 2);

    const { top, bottom } = OVERLAY_POSITIONS;

    return isTooltipCloserToTop ? bottom : top;
  }, [ref]);

  const handleShow = (event) => {
    const openDirection = getOpenDirection();

    setIsShown(!isShown);
    setTarget(event.target);
    setOverlayPlacement(openDirection);
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
        placement={overlayPlacement}
        container={ref.current}
        onHide={handleHide}
      >
        {children}
      </Overlay>
    </div>
  );
}
