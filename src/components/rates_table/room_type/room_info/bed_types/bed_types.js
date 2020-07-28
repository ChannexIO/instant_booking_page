import React from 'react';

import BedType from "./bed_type";

import styles from "./bed_types.module.css";

export default function BedTypes({ bedTypes }) {
  if (!Array.isArray(bedTypes)) {
    return null;
  }

  return (
    <div className={styles.bedTypesContainer}>
      {bedTypes.map(({ roomType, bedType, value }, index) => (
        <BedType
          roomType={roomType}
          bedType={bedType}
          value={value}
          key={index}
        />
      ))}
    </div>
  );
}