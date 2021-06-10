/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useRef, useState } from "react";
import { Overlay } from "react-bootstrap";

import getOpenDirection from "utils/get_open_direction";

import styles from "./tooltip.module.css";

const OVERLAY_POSITIONS = ["top", "bottom"];

export default function PoliciesInfo({ className, children }) {
  const [isShown, setIsShown] = useState(false);
  const [target, setTarget] = useState(null);
  const [overlayPlacement, setOverlayPlacement] = useState(OVERLAY_POSITIONS.top);
  const ref = useRef();

  const handleShow = useCallback(
    (event) => {
      const openDirection = getOpenDirection(ref, OVERLAY_POSITIONS);

      setIsShown(!isShown);
      setTarget(event.target);
      setOverlayPlacement(openDirection);
    },
    [ref, isShown],
  );

  const handleHide = () => {
    setIsShown(false);
  };

  return (
    <div className={[styles.tooltipContainer, className].join(" ")} ref={ref}>
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
