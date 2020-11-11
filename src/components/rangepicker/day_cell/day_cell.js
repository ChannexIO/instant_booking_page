import React, { useCallback } from 'react';

import styles from './day_cell.module.css';

const CALENDAR_DAY_STYLE_MODIFICATORS = {
  valid: styles.dayCellValid,
  blocked: styles.dayCellBlocked,
  'blocked-out-of-range': styles.dayCellBlockedOutOfRange,
  'selected-start': styles.dayCellSelected,
  'selected-end': styles.dayCellSelected,
  'selected-span': styles.dayCellSelectedSpan,
  'hovered-span': styles.dayCellHoveredSpan,
};

export default function DayCell(props) {
  const { isOutsideDay, modifiers = [], day, onDayClick, onDayMouseEnter, onDayMouseLeave } = props;

  const dayStyling = [styles.dayCell];

  modifiers.forEach((modifier) => dayStyling.push(CALENDAR_DAY_STYLE_MODIFICATORS[modifier]));

  const handleMouseEnter = useCallback(() => onDayMouseEnter(day), [day, onDayMouseEnter]);
  const handleMouseLeave = useCallback(() => onDayMouseLeave(day), [day, onDayMouseLeave]);
  const handleClick = useCallback(() => onDayClick(day), [day, onDayClick]);

  if (isOutsideDay || !day) {
    return <td />;
  }

  return (
    <td
      role="presentation"
      className={dayStyling.join(' ')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {day.format('D')}
    </td>
  );
}
