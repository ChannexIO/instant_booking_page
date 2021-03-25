import React from "react";

import styles from "./mobile_summary_container.module.css";

export default function MobileSummaryContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}
