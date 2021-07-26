import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import styles from "./properties_search_map.module.css";

export default function Marker({ item, isHighlighted, onMouseOver, onMouseOut, onSelect }) {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const handlePropertySelect = () => {
    onSelect(item);
  };

  const handleMouseOver = () => {
    if (!containerRef?.current) {
      return;
    }

    onMouseOver(item);
    containerRef.current.parentNode.style.zIndex = 1;
  };

  const handleMouseOut = () => {
    if (!containerRef?.current) {
      return;
    }

    onMouseOut(item);
    containerRef.current.parentNode.style.zIndex = 0;
  };

  const markerClassName = classNames(styles.marker, isHighlighted && styles.markerHighlited);

  return (
    <div
      ref={containerRef}
      className={markerClassName}
      onClick={handlePropertySelect}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
    >
      <span className={styles.markerContent}>{item.bestOffer}</span>
      <span className={styles.markerOverlay}>{t("properties:preview")}</span>
    </div>
  );
}
