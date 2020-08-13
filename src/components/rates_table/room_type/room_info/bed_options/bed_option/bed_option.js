import React from 'react';
import { CheckOutlined } from "@ant-design/icons";

import styles from "./bed_option.module.css";

export default function BedOption({ title, count, size }) {
  return (
    <div className={styles.bed}>
      <CheckOutlined />
      <div className={styles.bedTitle}>
        {`${count}x ${title}`}
      </div>
    </div>
  );}