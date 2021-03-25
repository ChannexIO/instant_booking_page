import React from "react";
import { CheckOutlined } from "@ant-design/icons";

import styles from "./bed_option.module.css";

export default function BedOption({ title, count }) {
  return (
    <div className={styles.bed}>
      <div className={styles.bedTitle}>{`${count} x ${title}`}</div>
      <CheckOutlined className={styles.bedIcon} />
    </div>
  );
}
