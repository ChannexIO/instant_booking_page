import React from "react";

import styles from "./cell.module.css";

export default function Cell({ children, className, noLine, noPadding }) {
  const classNames = [styles.cell];

  if (noLine) {
    classNames.push(styles.cellNoLine);
  }

  if (noPadding) {
    classNames.push(styles.cellNoPadding);
  }

  classNames.push(className);

  return <div className={classNames.join(" ")}>{children}</div>;
}
