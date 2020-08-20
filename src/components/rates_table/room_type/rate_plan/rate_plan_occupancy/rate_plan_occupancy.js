import React from 'react';
import { UserOutlined } from "@ant-design/icons";

import styles from "./rate_plan_occupancy.module.css";

const ICONS_AS_NUMBER_THRESHOLD = 5;

export default function RatePlanOccupancy({ occupancy }) {
  const { adults } = occupancy;
  const isMultipleIcons = adults < ICONS_AS_NUMBER_THRESHOLD;

  const captionText = `x${adults}`;
  const iconsAmount = isMultipleIcons ? adults : 1;

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