import React from 'react';
import { UserOutlined } from '@ant-design/icons';

import styles from './occupancy_section.module.css';

const ICONS_AS_NUMBER_THRESHOLD = 5;

export default function OccupancySection({ availableSpaces, selectedSpaces, className }) {
  const isMultipleIcons = availableSpaces < ICONS_AS_NUMBER_THRESHOLD;

  const captionText = `x${availableSpaces}`;
  const iconsAmount = isMultipleIcons ? availableSpaces : 1;

  const iconsArray = new Array(iconsAmount)
    .fill(null)
    .map((el, index) => {
      // TODO - replace icon with the real one
      const isIconFilled = selectedSpaces && index < selectedSpaces;
      const iconClass = isMultipleIcons && isIconFilled ? styles.iconActive : styles.iconInactive;

      return <UserOutlined className={iconClass} key={index.toString()}/>;
    });

  if (!availableSpaces) {
    return null;
  }

  return (
    <div className={[styles.occupancyContainer, className].join(' ')}>
      {iconsArray}
      {!isMultipleIcons && (
        <div className={styles.occupancyCaption}>
          {captionText}
        </div>
      )}
    </div>
  );
}