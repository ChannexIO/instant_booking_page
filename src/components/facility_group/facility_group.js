import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import Facility from "./faclitily";

import styles from "./facility_category.module.css";

export default function FacilityGroup({ facilityGroup }) {
  const { t } = useTranslation();
  const { categoryCode, facilities } = facilityGroup;

  const groupFacilities = useMemo(() => {
    return facilities.map((facility) => <Facility key={facility} code={facility} />);
  }, [facilities]);

  return (
    <div className={styles.facilityCategory}>
      {t(`facility_categories:${categoryCode}`)}
      <div>{groupFacilities}</div>
    </div>
  );
}
