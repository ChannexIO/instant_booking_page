import React from "react";

import styles from "./room_details_section.module.css";

export default function RoomDetailsSection({ lable, children }) {
  return (
    <div className={styles.roomDetailsContainer}>
      <h6 className={styles.roomDetailsHeader}>{lable}</h6>
      <div className={styles.roomDetailsContent}>{children}</div>
    </div>
  );
}
