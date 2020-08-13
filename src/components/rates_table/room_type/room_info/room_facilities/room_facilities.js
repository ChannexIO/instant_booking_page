import React from 'react';

import Facility from "components/faclitily";

import styles from "./room_facilities.module.css";

export default function RoomFacilities({ facilities }) {
  if (!Array.isArray(facilities)) {
    return null;
  }

  return (
    <div className={styles.roomFacilities}>
      {facilities.map((code) => <Facility code={code} key={code} />)}
    </div>
  )
}