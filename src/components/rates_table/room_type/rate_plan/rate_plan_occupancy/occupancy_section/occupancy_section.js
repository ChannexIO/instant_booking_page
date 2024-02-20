import React from "react";

import styles from "./occupancy_section.module.css";

const MAX_OCCUPANCIES = {
  adults: 4,
  children: 2,
  infants: 2,
};

export default function OccupancySection({ occupancy, type, icon }) {
  const maxOccupancy = MAX_OCCUPANCIES[type];

  if (occupancy <= maxOccupancy) {
    const occupancies = new Array(occupancy).fill(0);
    return (
      <div className={styles.occupancyContainer}>
        {type !== "adults" && <div className={styles.occupancyCaption}>+</div>}
        {occupancies.map((_) => (
          <img src={icon} alt={type} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.occupancyContainer}>
      {type !== "adults" && <div className={styles.occupancyCaption}>+</div>}
      <img src={icon} alt={type} />
      <div className={styles.occupancyCaption}>{`× ${occupancy}`}</div>
    </div>
  );
}
