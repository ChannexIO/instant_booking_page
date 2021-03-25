import React from "react";
import { EnvironmentOutlined } from "@ant-design/icons";

import styles from "./hotel_location.module.css";

export default function HotelLocation({ property }) {
  return (
    <div className={styles.locationContainer}>
      <EnvironmentOutlined className={styles.icon} />
      <div>{property.address}</div>
    </div>
  );
}
