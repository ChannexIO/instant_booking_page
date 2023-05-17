import React from "react";

import Cell from "components/layout/cell";

import OccupancySection from "./occupancy_section";

import IconGuestChild from "static/icons-children.svg";
import IconGuestInfant from "static/icons-children.svg";
import IconGuestSingle from "static/icons-adults.svg";
import styles from "./rate_plan_occupancy.module.css";

export default function RatePlanOccupancy({ occupancy, childrenOccupancy }) {
  const { adults, children, infants } = occupancy;
  const isChildIconShown = children && childrenOccupancy;
  const isInfantIconShown = infants && childrenOccupancy;

  return (
    <Cell className={styles.occupancyCell}>
      <div className={styles.occupanciesContainer}>
        <OccupancySection
          type="adults"
          occupancy={adults}
          icon={IconGuestSingle}
        />
        {Boolean(isChildIconShown) && (
          <OccupancySection
            type="children"
            occupancy={children}
            icon={IconGuestChild}
          />
        )}
        {Boolean(isInfantIconShown) && (
          <OccupancySection
            type="infant"
            occupancy={infants}
            icon={IconGuestInfant}
          />
        )}
      </div>
    </Cell>
  );
}
