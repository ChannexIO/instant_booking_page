import React from "react";

import styles from "./select_separator.module.css";

export default function SelectSeparator({ children }) {
  return <div className={styles.separator}>{children}</div>;
}
