import React from "react";

import styles from "./policy_section.module.css";

export default function PolicySection({ title, text }) {
  return (
    <div className={styles.sectionContainer}>
      <strong>{title}: </strong>
      <span>{text}</span>
    </div>
  );
}
