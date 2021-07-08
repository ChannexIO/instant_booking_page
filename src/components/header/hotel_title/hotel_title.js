import React from "react";

import styles from "./hotel_title.module.css";

export default function HotelTitle({ title, hideTitle }) {
  if (hideTitle) {
    return null;
  }

  return <div className={styles.hotelTitle}>{title}</div>;
}
