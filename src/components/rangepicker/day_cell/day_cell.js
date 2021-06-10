import React, { useCallback, useRef } from "react";

import LengthOfStayTooltip from "./length_of_stay_tooltip";

import styles from "./day_cell.module.css";

const CALENDAR_DAY_STYLE_MODIFICATORS = {
  valid: styles.dayCellValid,
  blocked: styles.dayCellBlocked,
  "blocked-out-of-range": styles.dayCellBlockedOutOfRange,
  "blocked-minimum-nights": styles.dayCellMinNightsRestricted,
  "selected-start": styles.dayCellSelectedStart,
  "selected-end": styles.dayCellSelectedEnd,
  "selected-span": styles.dayCellSelectedSpan,
  "hovered-span": styles.dayCellHoveredSpan,
};

const DEFAULT_MODIFIERS = new Set();
const MIN_STAY_TO_SHOW = 2;

export default function DayCell(props) {
  const containerRef = useRef();
  const {
    isOutsideDay,
    minStayLength,
    modifiers = DEFAULT_MODIFIERS,
    day,
    isMinStayRestricted,
    onDayClick,
    onDayMouseEnter,
    onDayMouseLeave,
  } = props;

  const dayStyling = [styles.dayCell];

  const isSelectedStart = modifiers && modifiers.has("selected-start");
  const isTooltipShown = isSelectedStart && minStayLength >= MIN_STAY_TO_SHOW;

  modifiers.forEach((modifier) => dayStyling.push(CALENDAR_DAY_STYLE_MODIFICATORS[modifier]));

  if (isMinStayRestricted) {
    dayStyling.push(styles.dayCellMinStayRestricted);
  }

  const handleMouseEnter = useCallback(() => onDayMouseEnter(day), [day, onDayMouseEnter]);
  const handleMouseLeave = useCallback(() => onDayMouseLeave(day), [day, onDayMouseLeave]);
  const handleClick = useCallback(() => onDayClick(day), [day, onDayClick]);

  if (isOutsideDay || !day) {
    return <td />;
  }

  return (
    <td
      ref={containerRef}
      role="presentation"
      className={dayStyling.join(" ")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {day.format("D")}
      <LengthOfStayTooltip
        show={isTooltipShown}
        minStayLength={minStayLength}
        containerRef={containerRef}
      />
    </td>
  );
}
