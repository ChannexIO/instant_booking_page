import React from "react";

import styles from "./placeholder.module.css";

export default function Placeholder({ text, icon }) {
  const styledIcon = React.cloneElement(icon, { className: styles.icon });

  return (
    <div className={styles.container}>
      {styledIcon}
      <div>{text}</div>
    </div>
  );
}
