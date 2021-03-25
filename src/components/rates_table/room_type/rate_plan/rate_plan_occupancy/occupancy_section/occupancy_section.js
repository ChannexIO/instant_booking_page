import React from "react";

import styles from "./occupancy_section.module.css";

export default function OccupancySection({ additionalSpaces, type, icon }) {
  const captionText = `× ${additionalSpaces}`;

  return (
    <div className={styles.occupancyContainer}>
      <img src={icon} alt={type} />
      {Boolean(additionalSpaces) && <div className={styles.occupancyCaption}>{captionText}</div>}
    </div>
  );
}
