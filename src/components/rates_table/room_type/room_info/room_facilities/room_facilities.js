import React from 'react';

import FacilitiesContainer from './facilities_container';
import AdditionalFacilities from './room_additional_facilities';

const FACILITIES_SHOWN_BY_DEFAULT = 4;

export default function RoomFacilities({ facilities }) {
  if (!Array.isArray(facilities)) {
    return null;
  }

  const shownFacilities = facilities.slice(0,FACILITIES_SHOWN_BY_DEFAULT);
  const collapsedFacilities = facilities.slice(FACILITIES_SHOWN_BY_DEFAULT);

  return (
    <>
      <FacilitiesContainer facilities={shownFacilities} />
      <AdditionalFacilities facilities={collapsedFacilities} />
    </>
  );
}