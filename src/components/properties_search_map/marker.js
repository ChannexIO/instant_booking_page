import React, { useCallback } from "react";

import styles from "./properties_search_map.module.css";

export default function Marker({ item, handleSelectProperty }) {
  const onSelectProperty = useCallback(() => {
    handleSelectProperty(item);
  }, [handleSelectProperty, item]);

  return (
    <div className={styles.marker} onClick={onSelectProperty}>
      {item.bestOffer}
    </div>
  );
}
