import React from "react";

import Cell from "components/layout/cell";

import Date from "./date";

import styles from "./dates.module.css";

export default function Dates({ checkinDate, checkoutDate }) {
  return (
    <Cell>
      <div className={styles.datesWrapper}>
        <Date date={checkinDate} type="checkin" />
        <Date date={checkoutDate} type="checkout" />
      </div>
    </Cell>
  );
}
