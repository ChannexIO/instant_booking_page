import React from 'react';

import RoomAvailability from './room_availability';
import BedOptions from './bed_options';
import RoomFacilities from './room_facilities';
import RoomAdditionalFacilities from './room_additional_facilities';

export default function RoomInfo({ roomType, rowIndex, isMobile }) {
  const { title, ratePlans, availability, bedOptions, facilities, otherFacilities } = roomType;
  const ratesNumber = !isMobile && ratePlans ? ratePlans.length : 1;

  return (
    <td rowSpan={ratesNumber}>
      <div>{title}</div>
      <RoomAvailability availability={availability} />
      <BedOptions bedOptions={bedOptions} />
      <RoomFacilities facilities={facilities} />
      {/* do we even have additional facilities? */}
      {/* <RoomAdditionalFacilities facilities={otherFacilities} collapsable={Boolean(rowIndex)} /> */}
    </td>
  );
}