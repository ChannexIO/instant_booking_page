import React, { useMemo } from "react";

import FacilitiesContainer from "./facilities_container";
import AdditionalFacilities from "./room_additional_facilities";

const FACILITIES_SHOWN_BY_DEFAULT = 4;

export default function RoomFacilities({ facilities }) {
  const availableFacilities = useMemo(() => {
    if (!Array.isArray(facilities)) {
      return [];
    }

    return facilities.map((facilityGroup) => facilityGroup.facilities).flat();
  }, [facilities]);

  const shownFacilities = useMemo(() => availableFacilities.slice(0, FACILITIES_SHOWN_BY_DEFAULT), [
    availableFacilities,
  ]);
  const collapsedFacilities = useMemo(
    () => availableFacilities.slice(FACILITIES_SHOWN_BY_DEFAULT),
    [availableFacilities],
  );

  if (!availableFacilities.length) {
    return null;
  }

  return (
    <>
      <FacilitiesContainer facilities={shownFacilities} />
      <AdditionalFacilities facilities={collapsedFacilities} />
    </>
  );
}
