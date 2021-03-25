import React from "react";

import BedOption from "./bed_option";

import styles from "./bed_options.module.css";

export default function BedOptions({ bedOptions }) {
  if (!Array.isArray(bedOptions)) {
    return null;
  }

  return (
    <div className={styles.bedOptionsContainer}>
      {bedOptions.map(({ title, count, size }) => (
        <BedOption key={`${title}_${size}`} title={title} count={count} size={size} />
      ))}
    </div>
  );
}
