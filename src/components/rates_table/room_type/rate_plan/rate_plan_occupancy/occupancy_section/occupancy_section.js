import React from 'react';

import styles from './occupancy_section.module.css';

export default function OccupancySection({ availableSpaces, type, icon, showNumber }) {
  const captionText = `×${availableSpaces}`;

  return (
    <div className={styles.occupancyContainer}>
      <img
        src={icon}
        alt={type}
      />
      {showNumber && (
        <div className={styles.occupancyCaption}>
          {captionText}
        </div>
      )}
    </div>
  );
}
