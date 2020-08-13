import React from 'react';
import { UserOutlined } from "@ant-design/icons";

import styles from "./rate_plan_occupancy.module.css";

const ICONS_AS_NUMBER_THRESHOLD = 5;

export default function RatePlanOccupancy({ occupancy }) {
  const isMultipleIcons = occupancy < ICONS_AS_NUMBER_THRESHOLD;

  const captionText = `x${occupancy}`;
  const iconsAmount = isMultipleIcons ? occupancy : 1;

  const iconsArray = new Array(iconsAmount).fill(UserOutlined);

  return (
    <div className={styles.ratePlanOccupancyContainer}>
      {iconsArray.map((Icon, key) => <Icon key={key} />)}
      {!isMultipleIcons && (
        <div className={styles.ratePlansOccupancyCaption}>
          {captionText}
        </div>
      )}
    </div>
  );
}