import React from 'react';

import RoomAvailability from "./room_availability";
import BedOptions from "./bed_options";
import RoomFacilities from "./room_facilities";
import RoomAdditionalFacilities from "./room_additional_facilities";

export default function RoomInfo({ roomType, rowIndex }) {
  const { title, ratePlans, availability, bedOptions, facilities, otherFacilities } = roomType;
  const ratesNumber = ratePlans.length;

  return (
    <td rowSpan={ratesNumber}>
      <div>{title}</div>
      <RoomAvailability availability={availability} />
      <BedOptions bedOptions={bedOptions} />
      <RoomFacilities facilities={facilities} />
      <RoomAdditionalFacilities facilities={otherFacilities} collapsable={Boolean(rowIndex)} />
    </td>
  )
}