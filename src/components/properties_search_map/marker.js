import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";

import styles from "./properties_search_map.module.css";

export default function Marker({ item, handleSelectProperty }) {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const onSelectProperty = useCallback(() => {
    handleSelectProperty(item);
  }, [handleSelectProperty, item]);

  const handleMouseEnter = useCallback(() => {
    if (!containerRef?.current) {
      return;
    }

    containerRef.current.parentNode.style.zIndex = 1;
  }, [containerRef]);

  const handleMouseLeave = useCallback(() => {
    if (!containerRef?.current) {
      return;
    }

    containerRef.current.parentNode.style.zIndex = 0;
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className={styles.marker}
      onClick={onSelectProperty}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.markerContent}>{item.bestOffer}</span>
      <span className={styles.markerOverlay}>{t("properties:preview")}</span>
    </div>
  );
}
