import React from "react";

import styles from "./section_title.module.css";

export default function SectionTitle({ children }) {
  return <h4 className={styles.sectionTitle}>{children}</h4>;
}
