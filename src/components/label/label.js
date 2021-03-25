import React from "react";

import styles from "./label.module.css";

export default function Label({ className, children }) {
  return <div className={[styles.label, className].join(" ")}>{children}</div>;
}
